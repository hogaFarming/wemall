webpackJsonp([8],{"2fXs":function(a,e,t){var r=t("hG+E");"string"==typeof r&&(r=[[a.i,r,""]]),r.locals&&(a.exports=r.locals);t("8bSs")("e4241e30",r,!0)},"9Wp7":function(a,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r={data:function(){return{orderId:this.$route.query.orderid,orderData:{},payWays:[{label:"微信支付",value:"wechatpay"}],selectedPayWay:1,isWeChat:this.$utils.isWeChat(),modalVisible:!1}},mounted:function(){this.fetchOrderData()},methods:{fetchOrderData:function(){var a=this;this.$http.withLoading("/api/orders/"+this.orderId).then(function(e){a.orderData=e.data,a.orderData.pay_amount=e.data.actual_price-e.data.paid_price})},confirmPay:function(){this.wechatpay()},wechatpay:function(){var a=this;this.$http.withLoading({url:"/api/order/pays",data:{type:"wechatpay",device:"wap",order_id:this.orderId}}).then(function(e){if(e){var t=e.data;window.WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:t.appId,timeStamp:t.timeStamp,nonceStr:t.nonceStr,package:t.package,signType:t.signType,paySign:t.paySign},function(e){"get_brand_wcpay_request:ok"===e.err_msg?window.location.href="/order/paystatus?order_id="+a.orderId:(e.err_msg,window.location.href="/order/paystatus?order_id="+a.orderId+"&status=0")})}})},onModalConfirm:function(){this.modalVisible=!1},onModalCancel:function(){this.modalVisible=!1}}},n={render:function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[t("x-cell",{staticClass:"mgb"},[a._v("订单总价\n    "),t("x-money",{attrs:{slot:"right",value:a.orderData.actual_price,color:"red"},slot:"right"})],1),a._v(" "),t("x-cell",[a._v("还需要支付\n    "),t("x-money",{attrs:{value:a.orderData.pay_amount,size:"small"}})],1),a._v(" "),t("x-radio-select",{attrs:{options:a.payWays},model:{value:a.selectedPayWay,callback:function(e){a.selectedPayWay=e},expression:"selectedPayWay"}}),a._v(" "),t("div",{staticStyle:{margin:"1.0667rem 0.75rem"}},[t("x-button",{attrs:{size:"full",type:"primary",pill:""},nativeOn:{click:function(e){a.confirmPay(e)}}},[a._v("确认支付")])],1),a._v(" "),t("x-modal",{staticClass:"pay-result-modal",attrs:{value:a.modalVisible,"confirm-text":"继续支付"},on:{confirm:a.onModalConfirm,cancel:a.onModalCancel}},[t("div",{staticStyle:{"text-align":"center"}},[t("img",{attrs:{src:"/static/icon/pay_failure.png",alt:"图片"}}),a._v(" "),t("br"),a._v(" "),t("span",[a._v("支付失败！")])]),a._v(" "),t("br"),a._v(" "),t("p",[a._v("\n      可能由以下原因造成： "),t("br"),a._v("\n      1、网络信号差或请求超时； "),t("br"),a._v("\n      2、意外关闭支付页面； "),t("br"),a._v("\n      3、其他原因 "),t("br"),t("br"),a._v("\n      建议您换个网络环境尝试重新支付，如果还是失败可咨询客服。"),t("br"),t("br"),a._v("\n      订单号：2017 0401 1010 1612 1270\n    ")])])],1)},staticRenderFns:[]},i=t("/Xao")(r,n,!1,function(a){t("2fXs")},null,null);e.default=i.exports},"hG+E":function(a,e,t){(a.exports=t("BkJT")(!0)).push([a.i,"\n.page {\n  font-size: 14px;\n}\n","",{version:3,sources:["E:/dev/wemall/src/views/cart/pay.vue"],names:[],mappings:";AACA;EACE,gBAAgB;CACjB",file:"pay.vue",sourcesContent:["\n.page {\n  font-size: 14px;\n}\n"],sourceRoot:""}])}});
//# sourceMappingURL=8.2b50ada4a7c0148f8bcd.js.map