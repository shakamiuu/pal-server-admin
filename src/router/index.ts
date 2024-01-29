import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHashHistory } from 'vue-router';

NProgress.configure({ showSpinner: false });

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
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
    next();
});

export default router;
