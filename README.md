# mern-ecommerce
# เริ่มต้นโปรเจคให้ติดตั้ง Node_modules ทั้ง Server && Client ใช้คำสั่ง
npm install

# ทำการสร้างไฟล์ .env ทั้ง Server && Client
# ** env file client สร้าง keyword เป็น **
VITE_URL = http://localhost:5050/api //ดึงข้อมูล จาก เซิร์ฟเวอร์ มาแสดงที่หน้าเว็บ
VITE_LINK_IMG = http://localhost:5050 //เป็นลิงก์ api ใช้ดึงข้อมูลรูป จากเซิร์ฟเวอร์มาใช้งาน

# ** env file Server สร้าง keyword เป็น **
PORT= 5050 //พอร์ท server Connect
MY_DATABASE= mongodb://127.0.0.1:27017/testecom // เชื่อต่อฐานข้อมูล mongoDB **ต้องดาวน์โหลด Mongo DB ลงเครื่องผู้ใช้งานก่อน
JWT_SECRET = สร้างโทเคน พิมพ์ อะไรไปก็ได้ เช่น admindev@Valentinote
TOKEN_LINE = โทเคนไลน์ notify ของผู้ใช้งาน สมัครใช้งาน Line notify เพื่อเอาโทเคนมาใช้งานในการแจ้งเตือน

# คำสั่งรันเซิร์ฟเวอร์
npm start

# คำสั่งรัน client
npm run dev

# ดาวน์โหลดติดตั้ง Mongo DB Database
https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.4-signed.msi

# สามารถนำไปใช้งานได้ในกรณีศึกษา หรือนำไปพัฒนาต่อได้ ไม่อนุญาติให้นำไปจำหน่าย
# โปรเจคเป็น ออฟไลน์ นะครับ


สนใจทำโปรเจค หรือสอบถามข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ เฟสบุ๊ค
https://www.facebook.com/methasit.bunthanom/
