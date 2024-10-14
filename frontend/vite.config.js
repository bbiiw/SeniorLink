import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // พอร์ตที่ใช้ในการพัฒนา
    host: true, // เปิดให้สามารถเข้าถึงจากภายนอกได้
    hmr: {
      host: '34.87.118.33', // ใช้ IP ของเซิร์ฟเวอร์แทน localhost
      port: 5173, // พอร์ตสำหรับ WebSocket
    },
  },
});

