import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // เปลี่ยนพอร์ตที่นี่
    host: true, // เปิดให้เข้าถึงจากเครือข่ายอื่น ๆ
  },
});
