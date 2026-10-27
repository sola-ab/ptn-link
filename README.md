# School Link | โรงเรียนพัฒนศึกษา

🔗 **Short URL:** https://yourname.github.io/school-link/

ระบบรวมลิงก์ข้อมูลและบริการของโรงเรียนพัฒนศึกษา  
Landing page นี้ทำหน้าที่ redirect ไปยัง Google Apps Script Web App

## 🚀 วิธี Deploy บน GitHub Pages

### 1) สร้าง Repository
1. ไปที่ https://github.com/new
2. ตั้งชื่อ repo เช่น `school-link`
3. เลือก **Public** (GitHub Pages ฟรีต้อง public)
4. กด **Create repository**

### 2) อัปโหลดไฟล์
อัปโหลดไฟล์เหล่านี้ขึ้น GitHub:
- `index.html`
- `404.html`
- `manifest.json`
- `favicon.ico`
- `favicon-16x16.png`
- `favicon-32x32.png`
- `apple-touch-icon.png`
- `README.md`

### 3) ตั้งค่า GAS URL
แก้ไฟล์ `index.html` บรรทัด:
```js
const GAS_URL = 'https://script.google.com/macros/s/YOUR_DEPLOY_ID/exec';
