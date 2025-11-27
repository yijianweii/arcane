import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // 使用相对路径避免部署时的路径问题
  base: './',
  build: {
    // 启用代码分割，确保动态导入的组件被单独打包
    rollupOptions: {
      output: {
        manualChunks: {
          // 将demos目录下的组件单独打包
          demos: ['src/demos/BlogDemo/index.tsx', 'src/demos/ThemeShowcase/index.tsx',
                  'src/demos/CanvasParticles/index.tsx', 'src/demos/LazyImageDemo/index.tsx',
                  'src/demos/CityVoxels/index.tsx', 'src/demos/DocxPreview/index.tsx',
                  'src/demos/3DCardDemo/index.tsx', 'src/demos/ChartDemo/index.tsx',
                  'src/demos/MinimalResumeDemo/index.tsx', 'src/demos/BlogDemo/BlogPost.tsx']
        }
      }
    }
  }
})
