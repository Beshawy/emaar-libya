import app from './api/index.js';

const PORT = 5001;
const listener = app.listen(PORT, async () => {
    console.log(`Test server running on port ${PORT}...`);
    try {
        console.log("1. Testing signature generation...");
        const res = await fetch(`http://localhost:${PORT}/api/upload-signature`);
        if (res.ok) {
            const data = await res.json();
            console.log("✅ Signature generation successful!", Object.keys(data));
            if (data.signature && data.apiKey && data.cloudName) {
                console.log("✅ Env variables are present and correct format.");
            } else {
                console.log("❌ Env variables are MISSING.");
            }
        } else {
            console.log("❌ Signature generation failed:", await res.text());
        }

        console.log("\n2. Testing MongoDB connection...");
        const dbRes = await fetch(`http://localhost:${PORT}/api/services`);
        if (dbRes.ok) {
            const data = await dbRes.json();
            console.log("✅ MongoDB Connection successful! Services count:", data.length);
        } else {
            console.log("❌ MongoDB Connection failed:", await dbRes.text());
        }
    } catch (e) {
        console.error("Test error:", e);
    } finally {
        listener.close();
        process.exit(0);
    }
});
