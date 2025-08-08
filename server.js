// 1. Import 'http' module ซึ่งเป็นของที่มีมากับ Node.js เลย
const http = require('http');

// กำหนด port ที่จะรันเซิร์ฟเวอร์
const port = 3000;

// 2. เตรียมข้อมูล (เหมือนเดิมเป๊ะๆ)
const departments_data = {
    'เทคโนโลยีสารสนเทศ': 120,
    'ช่างยนต์': 95,
    'บัญชี': 110,
    'การตลาด': 85,
};
const levels_data = {
    'ปวช. 1': 80,
    'ปวช. 2': 85,
    'ปวช. 3': 75,
    'ปวส. 1': 90,
    'ปวส. 2': 80,
};
const male_count = 220;
const female_count = 190;
const total_count = Object.values(departments_data).reduce((sum, count) => sum + count, 0);
const data = {
    total: total_count,
    male: male_count,
    female: female_count,
    levels: levels_data,
    departments: departments_data,
};

// 3. สร้างเซิร์ฟเวอร์ด้วย http.createServer
const server = http.createServer((req, res) => {
    // req คือ request ที่ยิงเข้ามา, res คือ response ที่เราจะส่งกลับไป

    // --- ส่วนที่ Express ทำให้เราอัตโนมัติ แต่เราต้องทำเอง ---

    // 4. ตั้งค่า Headers เองทั้งหมด
    // ตั้งค่า CORS Header เพื่อให้ Browser ยอมรับข้อมูล
    res.setHeader('Access-Control-Allow-Origin', '*');
    // ตั้งค่าประเภทข้อมูลที่จะส่งกลับไปว่าเป็น JSON ภาษาไทย
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 5. ทำ Routing เองแบบง่ายๆ
    // เช็คว่า URL ที่ยิงเข้ามาคือ '/api/stats' หรือไม่
    if (req.url === '/api/stats' && req.method === 'GET') {
        // ถ้าใช่ ให้ส่งข้อมูลกลับไป
        res.writeHead(200); // ส่ง Status Code 200 OK
        res.end(JSON.stringify(data, null, 2)); // แปลง Object เป็น JSON String แล้วส่งกลับ
    } else {
        // ถ้าไม่ใช่ URL ที่เรารู้จัก ให้ส่ง 404 Not Found กลับไป
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
    // --- จบส่วนที่ต้องทำเอง ---
});

// 6. สั่งให้เซิร์ฟเวอร์เริ่มทำงาน
server.listen(port, () => {
    console.log(`🚀 Pure Node.js Server is running on http://localhost:${port}`);
    console.log(`📊 API endpoint available at http://localhost:${port}/api/stats`);
});