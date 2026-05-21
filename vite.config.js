import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: 'terser',
    terserOptions: {
      mangle: {
        toplevel: true,         // เปลี่ยนชื่อตัวแปรและฟังก์ชันระดับบนสุดเป็น a, b, c
      }
    }
  }
})
