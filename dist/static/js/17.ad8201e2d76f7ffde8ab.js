webpackJsonp([17],{"9Wp7":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("3cXf"),r=a.n(n),i={data:function(){return{orderId:this.$route.query.orderid,orderData:{},payWays:[{label:"微信支付",value:"wechatpay"}],selectedPayWay:1,isWeChat:this.$utils.isWeChat(),modalVisible:!1}},mounted:function(){this.fetchOrderData()},methods:{fetchOrderData:function(){var e=this;this.$http.withLoading("/api/orders/"+this.orderId).then(function(t){e.orderData=t.data,e.orderData.pay_amount=t.data.actual_price-t.data.paid_price})},confirmPay:function(){this.wechatpay()},wechatpay:function(){var e=this;this.$http.withLoading({url:"/api/order/pays",method:"post",data:{type:"wechatpay",device:"wap",order_id:this.orderId}}).then(function(t){if(t){var a=t.data;window.WeixinJSBridge.invoke("getBrandWCPayRequest",{appId:a.appId,timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:a.signType,paySign:a.paySign},function(t){alert(r()(t)),"get_brand_wcpay_request:ok"===t.err_msg?window.location.href="/order/paystatus?order_id="+e.orderId:"get_brand_wcpay_request:cancel"===t.err_msg||(e.modalVisible=!0)})}})},onModalConfirm:function(){this.modalVisible=!1},onModalCancel:function(){this.modalVisible=!1}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("x-cell",{staticClass:"mgb"},[e._v("订单总价\n    "),a("x-money",{attrs:{slot:"right",value:e.orderData.actual_price,color:"red"},slot:"right"})],1),e._v(" "),a("x-cell",[e._v("还需要支付\n    "),a("x-money",{attrs:{value:e.orderData.pay_amount,size:"small"}})],1),e._v(" "),a("x-radio-select",{attrs:{options:e.payWays},model:{value:e.selectedPayWay,callback:function(t){e.selectedPayWay=t},expression:"selectedPayWay"}}),e._v(" "),a("div",{staticStyle:{margin:"1.0667rem 0.75rem"}},[a("x-button",{attrs:{size:"full",type:"primary",pill:""},nativeOn:{click:function(t){e.confirmPay(t)}}},[e._v("确认支付")])],1),e._v(" "),a("x-modal",{staticClass:"pay-result-modal",attrs:{value:e.modalVisible,"confirm-text":"继续支付"},on:{confirm:e.onModalConfirm,cancel:e.onModalCancel}},[a("div",{staticStyle:{"text-align":"center"}},[a("img",{attrs:{src:"/static/icon/pay_failure.png",alt:"图片"}}),e._v(" "),a("br"),e._v(" "),a("span",[e._v("支付失败！")])]),e._v(" "),a("br"),e._v(" "),a("p",[e._v("\n      可能由以下原因造成： "),a("br"),e._v("\n      1、网络信号差或请求超时； "),a("br"),e._v("\n      2、意外关闭支付页面； "),a("br"),e._v("\n      3、其他原因 "),a("br"),a("br"),e._v("\n      建议您换个网络环境尝试重新支付，如果还是失败可咨询客服。"),a("br"),a("br"),e._v("\n      订单号：2017 0401 1010 1612 1270\n    ")])])],1)},staticRenderFns:[]},s=a("/Xao")(i,o,!1,function(e){a("mfvb")},null,null);t.default=s.exports},THtg:function(e,t,a){(e.exports=a("BkJT")(!0)).push([e.i,"\n.page {\n  font-size: 14px;\n}\n","",{version:3,sources:["E:/dev/wemall/src/views/cart/pay.vue"],names:[],mappings:";AACA;EACE,gBAAgB;CACjB",file:"pay.vue",sourcesContent:["\n.page {\n  font-size: 14px;\n}\n"],sourceRoot:""}])},mfvb:function(e,t,a){var n=a("THtg");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("8bSs")("79b36e26",n,!0)}});
//# sourceMappingURL=17.ad8201e2d76f7ffde8ab.js.map