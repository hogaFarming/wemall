import Vue from 'vue'
import Router from 'vue-router'
import auth from './authorization'
import utils from '../utils/common'
import cache from '../utils/cache'

Vue.use(Router)

// 目录
// const ViewsIndex = () => import('views/index')

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/home' },

    { path: '/home', component: () => import('views/home/home'), meta: { title: '首页' } },

    // 登录
    { path: '/login', component: () => import('views/auth/login'), meta: { title: '登录' } },
    { path: '/register', component: () => import('views/auth/register'), meta: { title: '注册' } },

    // 精选
    { path: '/shares', component: () => import('views/shares/shares'), meta: { title: '精选' } },
    { path: '/shares/comment/:id', component: () => import('views/shares/comment'), meta: { title: '晒单详情' } },
    { path: '/shares/article/:id', component: () => import('views/shares/article'), meta: { title: '文章详情' } },

    // 购物车
    { path: '/cart', component: () => import('views/cart/cart'), meta: { requireAuth: true, title: '购物车' } },
    { path: '/cart/order', component: () => import('views/cart/cart-order'), meta: { requireAuth: true, title: '确认订单' } },
    { path: '/order/pay', component: () => import('views/cart/pay'), meta: { requireAuth: true, title: '付款' } },

    // 我的
    { path: '/my/home', component: () => import('views/my/home'), meta: { requireAuth: true, title: '我的' } },
    { path: '/my/address', component: () => import('views/my/address'), meta: { requireAuth: true, title: '收货地址管理' } },
    { path: '/my/address/edit', component: () => import('views/my/address-form'), meta: { requireAuth: true, title: '编辑收货地址' } },
    { path: '/my/comments', component: () => import('views/my/comments'), meta: { requireAuth: true, title: '我的评价' } },
    { path: '/my/likes/articles', component: () => import('views/my/likes-article'), meta: { requireAuth: true, title: '喜欢的文章' } },
    { path: '/my/likes/product', component: () => import('views/my/likes-product'), meta: { requireAuth: true, title: '喜欢的商品' } },
    { path: '/my/message', component: () => import('views/my/message'), meta: { requireAuth: true, title: '消息列表' } },
    { path: '/my/views', component: () => import('views/my/my-views'), meta: { requireAuth: true, title: '我的足迹' } },
    { path: '/my/profile', component: () => import('views/my/profile'), meta: { requireAuth: true, title: '个人资料' } },
    { path: '/my/assets', component: () => import('views/my/my-assets'), meta: { requireAuth: true, title: '我的财产' } },
    { path: '/my/score', component: () => import('views/my/my-score'), meta: { requireAuth: true, title: '我的积分' } },
    { path: '/my/score-sign', component: () => import('views/my/my-score-sign'), meta: { requireAuth: true, title: '我的积分' } }, // 积分签到
    { path: '/my/balance', component: () => import('views/my/my-balance'), meta: { requireAuth: true, title: '我的余额' } },
    { path: '/my/balance-recharge', component: () => import('views/my/my-balance-recharge'), meta: { requireAuth: true, title: '我的余额' } }, // 余额充值
    { path: '/my/cards', component: () => import('views/my/my-cards'), meta: { requireAuth: true, title: '我的福利卡' } },
    { path: '/my/cards-exchange', component: () => import('views/my/my-cards-exchange'), meta: { requireAuth: true, title: '我的福利卡' } }, // 福利卡兑换
    { path: '/my/tickets', component: () => import('views/my/my-tickets'), meta: { requireAuth: true, title: '我的优惠券' } },

    // 通知
    { path: '/notice/:id', component: () => import('views/my/notice'), meta: { title: '公告详情' } },

    // 订单
    { path: '/order/list', component: () => import('views/order/list'), meta: { requireAuth: true, title: '订单列表' } },
    { path: '/order/:id', component: () => import('views/order/detail'), meta: { requireAuth: true, title: '订单详情' } },
    { path: '/order/:id/comment', component: () => import('views/order/comment-form'), meta: { requireAuth: true, title: '评价订单' } },
    // { path: '/order-comments', component: () => import('views/order/comments'), meta: { requireAuth: true } },
    { path: '/order/:id/delivery', component: () => import('views/order/delivery'), meta: { requireAuth: true, title: '物流详情' } },

    // 售后
    { path: '/refund/list', component: () => import('views/order/refund-list'), meta: { requireAuth: true, title: '退款售后' } },
    { path: '/refund/expired', component: () => import('views/order/refund-expired'), meta: { requireAuth: true, title: '售后超时' } },
    { path: '/refund/apply', component: () => import('views/order/refund-form'), meta: { requireAuth: true, title: '申请退款' } },
    { path: '/refund/:id', component: () => import('views/order/refund-detail'), meta: { requireAuth: true, title: '售后详情' } },

    // 商品
    { path: '/product/category', component: () => import('views/product/category'), meta: { title: '分类' } },
    { path: '/product/:id/comments', component: () => import('views/product/comments'), meta: { title: '全部评价' } },
    { path: '/product/list', component: () => import('views/product/list'), meta: { title: '商品列表' } },
    { path: '/product/search', component: () => import('views/product/search'), meta: { title: '商品搜索' } },
    { path: '/product/exchanges', component: () => import('views/product/exchanges'), meta: { title: '积分兑换' } },
    { path: '/product/:id', component: () => import('views/product/detail'), meta: { title: '商品详情' } },

    { path: '/tickets', component: () => import('views/ticket/ticket'), meta: { title: '领券中心' } },

    { path: '*', component: () => import('views/404'), meta: { title: '找不到页面' } }
  ]
})

/**
 * TODO 跳转到登录页
 * @param callback {string|boolean}
 */
export function gotoLoginPage (callback) {
  let backUrl = callback || '/'
  if (callback === true) {
    backUrl = window.app.root.$route.fullPath
  }
  // router.push({ path: '/login', query: { callback: backUrl } })

  cache.set('isLogin', 0)
  cache.set('isAuth', 0)
  if (utils.isWeChat()) {
    auth.check({
      type: 'wechatOauth',              // wechatOauth, login
      redirectUrl: '/api/wechat/auth',  // 验证不通过跳转的地址
      callbackUrl: backUrl        // 返回的地址
    })
  } else {
    auth.check({
      type: 'login',                    // wechatOauth, login
      redirectUrl: '/login',            // 验证不通过跳转的地址
      callbackUrl: backUrl       // 返回的地址
    })
  }
}

export default router
