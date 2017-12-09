export default {
  /* 默认图片 */
  defaultImg: function () {
    let baseimg = "data:image/png;base64,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";
    return baseimg;
  },

  /* 判断是否为微信 */
  isWeChat: function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
      return false;
    }else{
      return false;
    }
  },

  /* 判断是否为Android */
  isAndroid: function() {
    if (/(Android)/i.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    };
  },

  /* 判断访问终端 */
  device: function() {
    var u = navigator.userAgent,
      app = navigator.appVersion;

    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    };
  },

  /* 微信分享 */
  wechatjs: {
    run: function (obj) {

      let data = {
        ajax_data : obj.ajax_data || {},
        api_url : obj.api_url || '/',
        api_type : obj.api_type || 'POST',
        api_list : obj.api_list || [],
        hide_menu_items : obj.hide_menu_items || [],
        show_menu_items : obj.show_menu_items || [],
        debug : obj.debug || false
      };

      // data.ajax_data['url'] = location.href.split('#')[0];

      data.api_list.push('hideMenuItems');
      data.api_list.push('showMenuItems');

      //默认为分享朋友圈和好友
      data.api_list.push('onMenuShareTimeline');
      data.api_list.push('onMenuShareAppMessage');

      //微信js配置
      app.wechatjs.config = app.wechatjs.config || false;
      app.wechatjs.share_config = app.wechatjs.share_config || false;

      if(app.wechatjs.config === false){
        //获取js签名
        tools.ajax({
          url: data.api_url,
          ajaxData: data.ajax_data,
          type: data.api_type,
          successFun: function (res) {

            //全局配置
            app.wechatjs.config = {
              debug: data.debug,
              appId: res.data.sign.appId,
              timestamp: res.data.sign.timestamp,
              nonceStr: res.data.sign.nonceStr,
              signature: res.data.sign.signature,
              jsApiList: data.api_list
            };

            wx.config(app.wechatjs.config);

            wx.ready(function(){

              if(app.wechatjs.share_config !== false){
                // 分享到朋友圈
                wx.onMenuShareTimeline({
                  title: app.wechatjs.share_config.share_title, // 分享标题
                  link: app.wechatjs.share_config.share_url, // 分享链接
                  imgUrl: app.wechatjs.share_config.share_img, // 分享图标
                  success: function () {
                    // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                    // 用户取消分享后执行的回调函数
                  }
                });

                // 分享给朋友
                wx.onMenuShareAppMessage({
                  title: app.wechatjs.share_config.share_title, // 分享标题
                  desc: app.wechatjs.share_config.share_desc, // 分享描述
                  link: app.wechatjs.share_config.share_url, // 分享链接
                  imgUrl: app.wechatjs.share_config.share_img, // 分享图标
                  type: 'link', // 分享类型,music、video或link，不填默认为link
                  dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                  success: function () {
                    // 用户确认分享后执行的回调函数
                  },
                  cancel: function () {
                    // 用户取消分享后执行的回调函数
                  }
                });

                wx.hideMenuItems({
                  menuList: data.hide_menu_items // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
                });

                wx.showMenuItems({
                  menuList: data.show_menu_items // 要显示的菜单项
                });

                //注册微信播放录音结束事件
                // wx.onVoicePlayEnd({
                //     success: function (res) {
                //         stopWave();
                //     }
                // });

              }
            });
          }
        });
      }
    },
    ready: function (obj){
      wx.ready(function(){
        //debugger
        //alert(app.wechatjs.share_config.share_url)
        if(app.wechatjs.share_config !== false){
          // 分享到朋友圈
          wx.onMenuShareTimeline({
            title: obj.share_title, // 分享标题
            link: obj.share_url, // 分享链接
            imgUrl: obj.share_img || app.defaultImg(), // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
          // 分享给朋友
          wx.onMenuShareAppMessage({
            title: obj.share_title, // 分享标题
            desc: obj.share_desc, // 分享描述
            link: obj.share_url, // 分享链接
            imgUrl: obj.share_img || app.defaultImg(), // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
              // 用户确认分享后执行的回调函数
            },
            cancel: function () {
              // 用户取消分享后执行的回调函数
            }
          });
        }
      });
      wx.error(function(res){
        tools.alert.error(res);
        location.href = location.href;
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      });
    }
  },

  /* 克隆对象 */
  extend: function(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
  },

  seeImg: function(curSrc,srcList) {
    if(!curSrc || !srcList || srcList.length == 0) {
      return;
    }

    if(this.isWeChat()){
      wx.previewImage({
        'current' : curSrc,
        'urls' : srcList
      });
    }else{

    }

  },

  /* 是否数组 */
  isArray :function isArray(args) {
    return Object.prototype.toString.call(args) === "[object Array]"
  }
}
