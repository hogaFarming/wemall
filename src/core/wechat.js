import request from './http'

export default {
  init () {
    const data = {} // TODO ios {url:tools.cache.get('initUrl')}
    request({
      url: '/api/wechat/js',
      method: 'post',
      data: data
    }).then(res => {
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.data.sign.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: res.data.sign.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.sign.nonceStr, // 必填，生成签名的随机串
        signature: res.data.sign.signature, // 必填，签名，见附录1
        jsApiList: [
          'hideMenuItems',
          'showMenuItems',
          'onMenuShareTimeline', // 默认为分享朋友圈和好友
          'onMenuShareAppMessage'
        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      })
    })
  },
  share ({ title, desc, url, imgUrl }) {
    // 分享到朋友圈
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: url, // 分享链接
      imgUrl: imgUrl, // 分享图标
      success () {
        // 用户确认分享后执行的回调函数
      },
      cancel () {
        // 用户取消分享后执行的回调函数
      }
    })
    // 分享给朋友
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: url, // 分享链接
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success () {
        // 用户确认分享后执行的回调函数
      },
      cancel () {
        // 用户取消分享后执行的回调函数
      }
    })
  },
  _ready () {

  },
  _error (err) {
    app.toast(err)
    location.href = location.href
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  }
}
