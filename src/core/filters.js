import utils from 'utils/common'
import { ORDER_STATUS, GOODS_STATUS } from './constants'

export default {
  install (Vue, options) {
    Vue.filter('orderStatus', function (value) {
      if (!value && value !== 0) return '--'
      return ORDER_STATUS[value] || '--'
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
