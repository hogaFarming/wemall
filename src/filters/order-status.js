import Vue from 'vue'

const ORDER_STATUS = {
  0: '待发货',
  1: '待收货'
}
Vue.filter('orderStatus', function (value) {
  if (!value && value !== 0) return '--'
  return ORDER_STATUS[value] || '--'
})
