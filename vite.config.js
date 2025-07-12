import { defineConfig} from 'vite'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers' 
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      reslovers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  disableHostCheck:true,
  resolve:{
    alias:{
      "@": resolve(__dirname, 'src')
    }
  }
})
