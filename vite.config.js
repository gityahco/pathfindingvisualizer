import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const isProduction = process.env.NODE_ENV === 'production';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/pathfindingvisualizer/",
  base: isProduction ? '/pathfindingvisualizer/' : '/',
})
