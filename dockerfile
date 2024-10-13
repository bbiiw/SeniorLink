# Dockerfile for React frontend

# ใช้ Node.js เป็น Base Image
FROM node:20

# ตั้งค่า Working Directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ลบ node_modules และ package-lock.json ถ้ามีอยู่
RUN rm -rf node_modules package-lock.json

# ติดตั้ง Dependencies
RUN npm install

# คัดลอกโค้ดทั้งหมด
COPY . .

# เปิดพอร์ต 5173 สำหรับ Vite Development Server
EXPOSE 5173

# เริ่ม Vite Development Server
CMD ["npm", "run", "dev"]
