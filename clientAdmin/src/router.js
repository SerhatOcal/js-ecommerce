import { createRouter, createWebHashHistory } from 'vue-router';
import Dashboard from './components/Dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'anasayfa',
        component: Dashboard,
    },
    {
        path: '/products',
        name: 'products',
        component: () => import('./views/Products/Products.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('./views/Categories/Categories.vue')
    },
    {
        path: '/brands',
        name: 'brands',
        component: () => import('./views/Brands/Brands.vue')
    },
    {
        path: '/brands/add',
        name: 'add-brand',
        component: () => import('./views/Brands/Add.vue')
    },
    {
        path: '/brands/edit/:id',
        name: 'edit-brand',
        component: () => import('./views/Brands/Edit.vue')
    },
    {
        path: '/formlayout',
        name: 'formlayout',
        component: () => import('./components/FormLayoutDemo.vue')
    },
    {
        path: '/input',
        name: 'input',
        component: () => import('./components/InputDemo.vue')
    },
    {
        path: '/floatlabel',
        name: 'floatlabel',
        component: () => import('./components/FloatLabelDemo.vue')
    },
    {
        path: '/invalidstate',
        name: 'invalidstate',
        component: () => import('./components/InvalidStateDemo.vue')
    },
    {
        path: '/button',
        name: 'button',
        component: () => import('./components/ButtonDemo.vue')
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('./components/TableDemo.vue')
    },
    {
        path: '/list',
        name: 'list',
        component: () => import('./components/ListDemo.vue')
    },
    {
        path: '/tree',
        name: 'tree',
        component: () => import('./components/TreeDemo.vue')
    },
    {
        path: '/panel',
        name: 'panel',
        component: () => import('./components/PanelsDemo.vue')
    },
    {
        path: '/overlay',
        name: 'overlay',
        component: () => import('./components/OverlayDemo.vue')
    },
    {
        path: '/menu',
        component: () => import('./components/MenuDemo.vue'),
        children: [
            {
                path: '',
                component: () => import('./components/menu/PersonalDemo.vue')
            },
            {
                path: '/menu/seat',
                component: () => import('./components/menu/SeatDemo.vue')
            },
            {
                path: '/menu/payment',
                component: () => import('./components/menu/PaymentDemo.vue')
            },
            {
                path: '/menu/confirmation',
                component: () => import('./components/menu/ConfirmationDemo.vue')
            },
        ],
    },
    {
        path: '/messages',
        name: 'messages',
        component: () => import('./components/MessagesDemo.vue')
    },
    {
        path: '/file',
        name: 'file',
        component: () => import('./components/FileDemo.vue')
    },
    {
        path: '/chart',
        name: 'chart',
        component: () => import('./components/ChartDemo.vue')
    },
    {
        path: '/misc',
        name: 'misc',
        component: () => import('./components/MiscDemo.vue')
    },
    {
        path: '/crud',
        name: 'crud',
        component: () => import('./views/CrudDemo.vue')
    },
    {
        path: '/timeline',
        name: 'timeline',
        component: () => import('./views/TimelineDemo.vue')
    },
    {
        path: '/empty',
        name: 'empty',
        component: () => import('./components/EmptyPage.vue')
    },
    {
        path: '/documentation',
        name: 'documentation',
        component: () => import('./components/Documentation.vue')
    },
    {
        path: '/blocks',
        name: 'blocks',
        component: () => import('./components/BlocksDemo.vue')
    },
    {
        path: '/icons',
        name: 'icons',
        component: () => import('./components/IconsDemo.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
