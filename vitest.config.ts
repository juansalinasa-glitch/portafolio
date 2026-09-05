import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  // viteConfig is actually a function in vite.config.ts because it uses defineConfig(() => { ... })
  // But to make it safe if it's evaluated, vitest supports just passing it as is when using mergeConfig if it's an object,
  // however, since it is a function we need to pass a fake object or just evaluate it.
  // Wait, let's just use `defineConfig` directly and include the vite plugins.
  viteConfig({ command: 'serve', mode: 'development' }),
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './src/setupTests.ts'
    }
  })
)
