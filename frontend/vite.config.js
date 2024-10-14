import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // พอร์ตที่ต้องการใช้
    host: '0.0.0.0', // เปิดให้เข้าถึงจากเครือข่ายอื่น ๆ โดยกำหนด host เป็น '0.0.0.0'
    strictPort: true, // ทำให้พอร์ตนี้ถูกใช้แน่นอน หากมีปัญหาจะแจ้งข้อผิดพลาดทันที
    watch: {
      usePolling: true, // เพิ่มการใช้ polling เพื่อให้แน่ใจว่าการเปลี่ยนแปลงไฟล์ถูกติดตามอย่างถูกต้อง
    }
  },
});
