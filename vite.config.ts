import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from "vite-plugin-environment";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    plugins: [react(), EnvironmentPlugin('all')],
    base: env.VITE_BASE_URL,
    cacheDir: ".vite",
    server: {
      open: env.VITE_BASE_URL,
      port: 1027,
      proxy: {
        "/dms-gis/api": {
          changeOrigin: true,
          target: "http://ca-10-10-97-180.vurix.kr",
      },
      "/dms-gis-proxy": {
        changeOrigin: true,
        target: "http://ca-10-10-97-180.vurix.kr",
    },
    "/vurix-dms/api/": {
      changeOrigin: true,
      target: "http://ca-10-10-97-180.vurix.kr",
  },
      }
    }
  }
})
