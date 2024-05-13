import { createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useAppStore } from '@/store';
import { getToken } from '@/utils/cache';
// 1. 定义路由组件.
// 也可以从其他文件导入

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: 'Home' */ '@/views/home/index.vue')
    },
    {
        path: '/auth',
        name: 'auth',
        component: () => import(/* webpackChunkName: 'Auth' */ '@/views/auth/index.vue'),
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () =>
                    import(/* webpackChunkName: 'AuthLogin' */ '@/views/auth/login/index.vue')
            },
            {
                path: 'register',
                name: 'register',
                component: () =>
                    import(/* webpackChunkName: 'AuthRegister' */ '@/views/auth/register/index.vue')
            }
        ]
    },
    {
        path: '/center',
        name: 'center',
        component: () => import(/* webpackChunkName: 'Center' */ '@/views/center/index.vue')
    },
    {
        path: '/message',
        name: 'message',
        component: () => import(/* webpackChunkName: 'History' */ '@/views/history/index.vue')
    },
    {
        path: '/product-details',
        name: 'product-details',
        component: () =>
            import(/* webpackChunkName: 'ProductDetails' */ '@/views/product-details/index.vue')
    },
    {
        path: '/company-info',
        name: 'company-info',
        component: () =>
            import(/* webpackChunkName: 'CompanyInfo' */ '@/views/company-info/index.vue')
    },
    {
        path: '/project-list',
        name: 'project-list',
        component: () =>
            import(/* webpackChunkName: 'ProjectList' */ '@/views/project-list/index.vue')
    },
    {
        path: '/project-info',
        name: 'project-info',
        component: () =>
            import(/* webpackChunkName: 'ProjectInfo' */ '@/views/project-info/index.vue')
    },
    {
        path: '/project-add',
        name: 'project-add',
        component: () =>
            import(/* webpackChunkName: 'ProjectAdd' */ '@/views/project-add/index.vue')
    },
    {
        path: '/application-list',
        name: 'application-list',
        component: () =>
            import(/* webpackChunkName: 'ApplicationList' */ '@/views/application-list/index.vue')
    },
    {
        path: '/product-apply',
        name: 'product-apply',
        redirect: '/product-apply/book',
        component: () =>
            import(/* webpackChunkName: 'ApplicationEdit' */ '@/views/product-apply/index.vue'),
        children: [
            {
                path: 'book',
                name: 'book',
                component: () =>
                    import(
                        /* webpackChunkName: 'ApplicationBook' */ '@/views/product-apply/book/index.vue'
                    )
            },
            {
                path: 'protocol',
                name: 'protocol',
                component: () =>
                    import(
                        /* webpackChunkName: 'ApplicationBookProtocol' */ '@/views/product-apply/book-protocol/index.vue'
                    )
            }
        ]
    }
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes // `routes: routes` 的缩写
});

const noTokenPath = ['/auth/login', '/auth/register'];
router.beforeEach((to, from, next) => {
    const store = useAppStore();
    const token = getToken();

    NProgress.start();
    if (!store.state.appIsReady) {
        if (noTokenPath.findIndex(e => to.path === e) === -1) {
            if (token) {
                store.initApp().then(() => {
                    store.updateState({
                        appIsReady: true,
                        appIsLogin: true
                    });
                    next({ ...to, replace: true });
                });
            } else {
                next('/auth/login');
            }
        } else {
            next();
        }
    } else {
        next();
    }
});
// 路由加载后
router.afterEach(() => {
    NProgress.done();
});

export default router;
