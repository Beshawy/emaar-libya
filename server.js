const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/emaar-libya';
const client = new MongoClient(uri);

let db;

async function connectToDatabase() {
  try {
    await client.connect();
    db = client.db('emaar-libya');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Routes
// Services
app.get('/api/services', async (req, res) => {
  try {
    const services = await db.collection('services').find({}).toArray();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const service = req.body;
    const result = await db.collection('services').insertOne(service);
    const newService = { ...service, _id: result.insertedId };
    res.json(newService);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const service = req.body;
    const result = await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      { $set: service }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ ...service, _id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const gallery = await db.collection('gallery').find({}).toArray();
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/gallery', async (req, res) => {
  try {
    const item = req.body;
    const result = await db.collection('gallery').insertOne(item);
    const newItem = { ...item, _id: result.insertedId };
    res.json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = req.body;
    const result = await db.collection('gallery').updateOne(
      { _id: new ObjectId(id) },
      { $set: item }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json({ ...item, _id: id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/gallery/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.collection('gallery').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Company Info
app.get('/api/company', async (req, res) => {
  try {
    const companyInfo = await db.collection('company').findOne({});
    res.json(companyInfo || {});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/company', async (req, res) => {
  try {
    const companyInfo = req.body;
    await db.collection('company').deleteMany({});
    const result = await db.collection('company').insertOne(companyInfo);
    res.json({ ...companyInfo, _id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
