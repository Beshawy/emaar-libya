import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);

const dbName = 'test'; // the default one used unless specified

async function main() {
  try {
    console.log("Connecting to MongoDB...");
    await client.connect();
    console.log("Connected successfully to server");
    
    // Check which database is used in server.js or api/index.js.
    // Given standard Mongoose usage, it will use the db given in the connection string.
    const db = client.db('emaar-libya');
    const collection = db.collection('services');
    
    const services = await collection.find({}).toArray();
    console.log(`Found ${services.length} services to migrate.`);
    
    let updatedCount = 0;
    
    for (const service of services) {
      const title = (service.title || '').toLowerCase();
      const titleAr = (service.titleAr || '').toLowerCase();
      const combined = title + " " + titleAr;
      
      let newCategory = 'other';
      
      if (combined.includes('door') || combined.includes('باب') || combined.includes('أبواب') || combined.includes('ابواب')) {
        newCategory = 'doors';
      } else if (combined.includes('window') || combined.includes('نافذة') || combined.includes('نوافذ') || combined.includes('شباك') || combined.includes('شبابيك')) {
        newCategory = 'windows';
      } else if (combined.includes('glass') || combined.includes('زجاج') || combined.includes('مزدوج') || combined.includes('دبل جلاس')) {
        newCategory = 'glass';
      } else if (combined.includes('decor') || combined.includes('ديكور') || combined.includes('زخرف') || combined.includes('هيكل')) {
        newCategory = 'decor';
      }
      
      // Update document
      await collection.updateOne(
        { _id: service._id },
        { $set: { category: newCategory } }
      );
      
      console.log(`Updated service: "${service.titleAr}" to category: ${newCategory}`);
      updatedCount++;
    }
    
    console.log(`Successfully migrated ${updatedCount} services.`);
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await client.close();
  }
}

main();
