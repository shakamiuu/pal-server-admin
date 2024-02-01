import { useAppStore } from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHashHistory } from 'vue-router';

NProgress.configure({ showSpinner: false });

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/layout/index.vue'),
            redirect: '/home/build',
            children: [
                {
                    path: 'build',
                    name: 'Build',
                    component: () => import('@/views/build/index.vue'),
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
                    path: 'plan',
                    name: 'Plan',
                    component: () => import('@/views/plan/index.vue'),
                },
            ],
        },
    ],
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach(async (to, _from, next) => {
    console.log('router===>', to);
    NProgress.start();
    const appStore = useAppStore();
    if (appStore.link || to.name === 'Login') {
        next();
    } else {
        router.push({ name: 'Login' });
    }
    NProgress.done();
});

export default router;
