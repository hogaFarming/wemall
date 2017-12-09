import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 目录
// const ViewsIndex = () => import('../views/index')

export default new Router({
  routes: [
    { path: '/', redirect: '/product/search' },

    // 登录
    { path: '/login', component: () => import('../views/auth/login') },
    { path: '/register', component: () => import('../views/auth/register') },

    // 精选
    { path: '/shares', component: () => import('../views/shares/shares') },
    { path: '/shares/comment/:id', component: () => import('../views/shares/comment') },
    { path: '/shares/article/:id', component: () => import('../views/shares/article') },

    // 购物车
    { path: '/cart', component: () => import('../views/cart/cart'), meta: { requireAuth: true } },
    { path: '/cart/order', component: () => import('../views/cart/cart-order'), meta: { requireAuth: true } },
    { path: '/cart/pay', component: () => import('../views/cart/pay'), meta: { requireAuth: true } },

    { path: '/home', component: () => import('../views/home/home') },

    // 我的
    { path: '/my/home', component: () => import('../views/my/home'), meta: { requireAuth: true } },
    { path: '/my/address', component: () => import('../views/my/address'), meta: { requireAuth: true } },
    { path: '/my/address/edit/:id', component: () => import('../views/my/address-form'), meta: { requireAuth: true } },
    { path: '/my/address/add', component: () => import('../views/my/address-form'), meta: { requireAuth: true } },
    { path: '/my/comments', component: () => import('../views/my/comments'), meta: { requireAuth: true } },
    { path: '/my/likes/articles', component: () => import('../views/my/likes-article'), meta: { requireAuth: true } },
    { path: '/my/likes/product', component: () => import('../views/my/likes-product'), meta: { requireAuth: true } },
    { path: '/my/message', component: () => import('../views/my/message'), meta: { requireAuth: true } },
    { path: '/my/score', component: () => import('../views/my/my-score'), meta: { requireAuth: true } },
    { path: '/my/tickets', component: () => import('../views/my/my-tickets'), meta: { requireAuth: true } },
    { path: '/my/views', component: () => import('../views/my/my-views'), meta: { requireAuth: true } },
    { path: '/my/profile', component: () => import('../views/my/profile'), meta: { requireAuth: true } },

    // 通知
    { path: '/notice/:id', component: () => import('../views/my/notice') },

    // 订单
    { path: '/order/list', component: () => import('../views/order/list'), meta: { requireAuth: true } },
    { path: '/order/:id', component: () => import('../views/order/detail'), meta: { requireAuth: true } },
    { path: '/order/:id/comment', component: () => import('../views/order/comment-form'), meta: { requireAuth: true } },
    // { path: '/order-comments', component: () => import('../views/order/comments'), meta: { requireAuth: true } },
    { path: '/order/:id/delivery', component: () => import('../views/order/delivery'), meta: { requireAuth: true } },

    // 售后
    { path: '/refund/list', component: () => import('../views/order/refund-list'), meta: { requireAuth: true } },
    { path: '/refund/expired', component: () => import('../views/order/refund-expired'), meta: { requireAuth: true } },
    { path: '/refund/apply', component: () => import('../views/order/refund-form'), meta: { requireAuth: true } },
    { path: '/refund/:id', component: () => import('../views/order/refund-detail'), meta: { requireAuth: true } },

    // 商品
    { path: '/product/category', component: () => import('../views/product/category') },
    { path: '/product/:id/comments', component: () => import('../views/product/comments') },
    { path: '/product/list', component: () => import('../views/product/list') },
    { path: '/product/search', component: () => import('../views/product/search') },
    { path: '/product/:id', component: () => import('../views/product/detail') },

    { path: '/tickets', component: () => import('../views/ticket/ticket') },

    { path: '*', component: () => import('../views/404') }
  ]
})
