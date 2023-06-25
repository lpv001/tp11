import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomePage.vue')
        },
        {
            path: '/login',
            name: 'login',
            component: () => import ('../views/LoginPage.vue')
        },
        {
            path: '/category',
            name: 'category',
            component: () => import ('../views/Category.vue')
        },
        {
            path: '/subcategory',
            name: 'subcategory',
            component: () => import ('../views/SubCategory.vue')
        },
        {
            path: '/product',
            name: 'product',
            component: () => import ('../views/Product.vue')
        }
    ]
})

export default router