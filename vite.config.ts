import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import electron from 'vite-plugin-electron';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { vitePluginForArco } from '@arco-plugins/vite-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron({
            entry: './electron/index.ts', // 入口文件地址
        }),
        AutoImport({
            resolvers: [ArcoResolver()],
        }),
        Components({
            resolvers: [
                ArcoResolver({
                    sideEffect: true,
                }),
            ],
        }),
        vitePluginForArco({
            style: 'css',
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
