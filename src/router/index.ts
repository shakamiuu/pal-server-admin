import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/layout/index.vue'),
            redirect: '/index',
            children: [
                {
                    path: 'index',
                    name: 'Index',
                    component: () => import('@/views/index/index.vue'),
                },
                {
                    path: 'server',
                    name: 'Server',
                    component: () => import('@/views/server/index.vue'),
                },
                {
                    path: 'config',
                    name: 'Config',
                    component: () => import('@/views/config/index.vue'),
                },
                {
                    path: 'instruct',
                    name: 'Instruct',
                    component: () => import('@/views/instruct/index.vue'),
                },
                {
                    path: 'auto',
                    name: 'Auto',
                    component: () => import('@/views/auto/index.vue'),
                },
            ],
        },
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

export default router;
