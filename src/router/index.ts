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
            name: 'Home',
            component: () => import('@/views/home/index.vue'),
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue'),
            meta: {},
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
