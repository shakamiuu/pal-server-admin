import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, 'src'),
            },
        ],
        extensions: ['.ts', '.js'],
    },
    build: {
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
            },
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:8080', //目标url
                changeOrigin: true, //支持跨域
                rewrite: (path) => path.replace(/^\/api/, ''),
                //重写路径,替换/api
            },
        },
    },
});
