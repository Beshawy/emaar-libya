import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config';

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// No longer using multer here; direct frontend uploading to Cloudinary instead.

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let dbPromise;

async function getDatabase() {
  if (!dbPromise) {
    dbPromise = client.connect().then((c) => {
      console.log('Connected to MongoDB Atlas');
      return c.db('emaar-libya');
    }).catch(err => {
      console.error('MongoDB connection error:', err);
      dbPromise = null;
      throw err;
    });
  }
  return dbPromise;
}

// Ensure connection when app loads
getDatabase().catch(console.error);

// =============== API ROUTES ===============

// --- Upload Signature Route for Direct Frontend Uploads ---
app.get('/api/upload-signature', (req, res) => {
  try {
    const timestamp = Math.round((new Date).getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request({
      timestamp: timestamp,
      folder: 'emaar-libya'
    }, process.env.API_SECRET);
    
    res.json({ 
      timestamp, 
      signature, 
      apiKey: process.env.API_KEY, 
      cloudName: process.env.CLOUD_NAME 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Services
app.get('/api/services', async (req, res) => {
  try {
    const db = await getDatabase();
    const services = await db.collection('services').find({}).toArray();
    res.json(services.map(s => ({ ...s, id: s._id.toString() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const db = await getDatabase();
    const service = req.body;
    delete service.id; // avoid inserting 'id' string field
    delete service._id;
    const result = await db.collection('services').insertOne(service);
    res.json({ ...service, id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;
    const service = req.body;
    delete service.id;
    delete service._id;
    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      { $set: service }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ...service, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const db = await getDatabase();
    const gallery = await db.collection('gallery').find({}).toArray();
    res.json(gallery.map(g => ({ ...g, id: g._id.toString() })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const db = await getDatabase();
    const item = req.body;
    delete item.id;
    delete item._id;
    const result = await db.collection('gallery').insertOne(item);
    res.json({ ...item, id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/gallery/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;
    const item = req.body;
    delete item.id;
    delete item._id;
    const result = await db.collection('gallery').updateOne(
      { _id: new ObjectId(id) },
      { $set: item }
    );
    if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ ...item, id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const db = await getDatabase();
    const { id } = req.params;
    const result = await db.collection('gallery').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Company Info
app.get('/api/company', async (req, res) => {
  try {
    const db = await getDatabase();
    const companyInfo = await db.collection('company').findOne({});
    if (companyInfo) {
      companyInfo.id = companyInfo._id.toString();
      delete companyInfo._id;
      res.json(companyInfo);
    } else {
      res.json({});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/company', async (req, res) => {
  try {
    const db = await getDatabase();
    const companyInfo = req.body;
    delete companyInfo.id;
    delete companyInfo._id;
    await db.collection('company').deleteMany({});
    const result = await db.collection('company').insertOne(companyInfo);
    res.json({ ...companyInfo, id: result.insertedId.toString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the app for Vercel Serverless Functions
export default app;
