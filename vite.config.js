import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const certDir = path.resolve(__dirname, '..')
const keyPath = path.join(certDir, 'privkey.pem')
const certPath = path.join(certDir, 'fullchain.pem')
const hasLocalCerts = fs.existsSync(keyPath) && fs.existsSync(certPath)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    ...(hasLocalCerts && {
      https: {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath),
      },
    }),
    host: '0.0.0.0',
    port: 5173,
  },
})
