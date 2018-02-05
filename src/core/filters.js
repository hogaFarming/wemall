import utils from 'utils/common'
import { ORDER_STATUS, GOODS_STATUS } from './constants'

export default {
  install (Vue, options) {
    Vue.filter('orderStatus', function (value) {
      if (!value && value !== 0) return '--'
      return ORDER_STATUS[value] || '--'
    })

    Vue.filter('refundType', function (value) {
      const text = {
        1: '仅退款',
        2: '退货退款'
      }
      return text[value] || '--'
    })

    Vue.filter('refundStatus', function (value) {
      switch (value) {
        case 0:
        case 2:
        case 5:
          return '处理中'
        case 3:
        case 4:
          return '退款关闭'
        case 1:
          return '退款成功'
        default:
          return ''
      }
    })

    Vue.filter('goodsStatus', function (value) {
      if (!value && value !== 0) return '--'
      if (value === 1) return ''
      return GOODS_STATUS[value] || '--'
    })

    Vue.filter('address', function (value) {
      if (!value) return ''
      const { province, city, district, address } = value
      return [province, city, district, address].filter(i => !!i).join('')
    })

    Vue.filter('goodsSkuName', function (goods) {
      if (!goods) return ''
      let names = []
      for (let k in goods.sku_name_arr) {
        names.push(goods.sku_name_arr[k])
      }
      return names.join(' ')
    })

    /* 默认图片过滤 */
    Vue.filter('thumbnail', utils.thumbnail)

    Vue.filter('toThumbnail', utils.toThumbnail)

    Vue.filter('fullTime', function (value) {
      return utils.timeFormat(value, '{YYYY}-{Mo}-{DD} {H}:{mm}:{ss}')
    })

    Vue.filter('justDate', function (value) {
      return utils.timeFormat(value, '{YYYY}-{Mo}-{DD}')
    })

    Vue.filter('justMonthDay', function (value) {
      return utils.timeFormat(value, '{Mo}/{DD}')
    })

    Vue.filter('balanceLogItem', function (value) {
      // 1,余额充值;2,余额支付订单;3,售后退款;4,余额提现;5,余额提现退回；6，余额购买福分卡
      const logTypes = {
        1: '余额充值',
        2: '余额支付订单',
        3: '售后退款',
        4: '余额提现',
        5: '余额提现退回',
        6: '余额购买福分卡'
      }
      return logTypes[value] || ''
    })

    Vue.filter('fufenLogItem', function (value) {
      /*
      * 积分类型（type字段）
      1,充值赠送福分;
      2,分享赠送福分;
      3,福分兑换商品消耗;
      4,福分卡购买;
      5,签到获取;
      6,初次绑定手机;
      50，牛牛游戏币兑换福分
      51，牛牛游戏币兑换福分
      52，推币机游戏币兑换福分
      53，推币机游戏币兑换福分
      */
      const logTypes = {
        1: '充值赠送福分',
        2: '分享赠送福分',
        3: '福分兑换商品消耗',
        4: '福分卡购买',
        5: '签到获取',
        6: '初次绑定手机',
        50: '牛牛游戏币兑换福分',
        51: '牛牛游戏币兑换福分',
        52: '推币机游戏币兑换福分',
        53: '推币机游戏币兑换福分'
      }
      return logTypes[value] || ''
    })

    Vue.filter('orderNs', function (value) {
      const match = value.toString().match(/(\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)/)
      const [whole, year, month, day, hour, min, sec] = match
      return `${year}-${month}-${day}`
    })

    /* 自定时间转换 */
    Vue.filter('setTimeTran', function (value, type) {
      return parseInt(value) === 0 ? '-' : utils.date(type, value)
    })

    /* 价格转换--保留两位小数 */
    Vue.filter('toFixedPrice', utils.toFixedPrice)

    /* 价格转换 */
    Vue.filter('toPrice', utils.toPrice)

    Vue.filter('percent', function (value) {
      let num = parseInt(value * 100)
      if (isNaN(num)) return '--%'
      return num + '%'
    })
  }
}
