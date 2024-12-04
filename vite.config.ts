import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, { VantResolve } from "vite-plugin-style-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => {
            if (name == 'show-toast') {
              return `../es/toast/style/index`; //修改vant引入路径
            } else {
              return `../es/${name}/style/index`; //修改vant引入路径
            }
          },
        }
      ]
    }),
  ],
})
