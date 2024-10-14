import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // เปิดพอร์ต 5173
    host: '0.0.0.0', // เปิดให้ทุก IP เข้าถึงได้ (ไม่ใช่แค่ localhost)
    hmr: {
      host: '34.87.118.33', // กำหนด IP เซิร์ฟเวอร์จริงสำหรับ WebSocket
      port: 5173,
    },
  },
});

