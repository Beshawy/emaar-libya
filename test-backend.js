async function testBackend() {
  console.log("=== بدء فحص السيرفر المحلي ===");
  try {
    // 1. Test /api/upload-signature
    console.log("1. اختبار توليد توقيع Cloudinary...");
    const sigRes = await fetch("http://localhost:5000/api/upload-signature");
    const sigData = await sigRes.json();
    
    if (sigData.signature && sigData.apiKey && sigData.cloudName) {
      console.log("✅ نجاح: تم توليد توقيع Cloudinary السري بنجاح!");
      console.log(`   - Cloud Name: ${sigData.cloudName}`);
      console.log(`   - Signature: ${sigData.signature.substring(0, 10)}...`);
    } else {
      console.error("❌ فشل: لم يتم توليد التوقيع، راجع مفاتيح .env", sigData);
      return;
    }

    // 2. Test /api/services (MongoDB Connection)
    console.log("\n2. اختبار الاتصال بقاعدة بيانات MongoDB...");
    const mongoRes = await fetch("http://localhost:5000/api/services");
    if (mongoRes.ok) {
        const mongoData = await mongoRes.json();
        console.log(`✅ نجاح: تم الاتصال بقاعدة البيانات. عدد الخدمات الحالية: ${mongoData.length}`);
    } else {
        console.error("❌ فشل: لم يتم الاتصال بقاعدة البيانات، السبب:", await mongoRes.text());
        return;
    }

    console.log("\n✅✅ النتيجة النهائية: الباك إند سليم ويعمل بنسبة 100%!");
  } catch (error) {
    console.error("❌ خطأ قاطع في الاتصال بالسيرفر:", error.message);
    console.log("تأكد أن (node server.js) يعمل في الخلفية.");
  }
}

testBackend();
