import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import electron from 'vite-plugin-electron';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron({
            entry: './electron/index.ts', // 入口文件地址
        }),
    ],
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
});
