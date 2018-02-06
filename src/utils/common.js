import tinytime from 'tinytime'

const utils = {
  /* 默认图片 */
  defaultImg: function () {
    let baseimg = 'data:image/png;base64,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'
    return baseimg
  },

  /* 判断是否为微信 */
  isWeChat: function () {
    var ua = window.navigator.userAgent.toLowerCase()
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },

  /* 判断是否为Android */
  isAndroid: function () {
    if (/(Android)/i.test(navigator.userAgent)) {
      return true
    } else {
      return false
    }

  },

  /* 判断访问终端 */
  device: function () {
    var u = navigator.userAgent,
      app = navigator.appVersion

    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信
      qq: u.match(/\sQQ/i) == ' qq' //是否QQ
    }
  },

  /* 微信分享 */
  wechatjs: {
    run: function (obj) {

      let data = {
        ajax_data: obj.ajax_data || {},
        api_url: obj.api_url || '/',
        api_type: obj.api_type || 'POST',
        api_list: obj.api_list || [],
        hide_menu_items: obj.hide_menu_items || [],
        show_menu_items: obj.show_menu_items || [],
        debug: obj.debug || false
      }

      // data.ajax_data['url'] = location.href.split('#')[0];

      data.api_list.push('hideMenuItems')
      data.api_list.push('showMenuItems')

      //默认为分享朋友圈和好友
      data.api_list.push('onMenuShareTimeline')
      data.api_list.push('onMenuShareAppMessage')

      //微信js配置
      app.wechatjs.config = app.wechatjs.config || false
      app.wechatjs.share_config = app.wechatjs.share_config || false

      if (app.wechatjs.config === false) {
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
            }

            wx.config(app.wechatjs.config)

            wx.ready(function () {

              if (app.wechatjs.share_config !== false) {
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
                })

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
                })

                wx.hideMenuItems({
                  menuList: data.hide_menu_items // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮
                })

                wx.showMenuItems({
                  menuList: data.show_menu_items // 要显示的菜单项
                })

                //注册微信播放录音结束事件
                // wx.onVoicePlayEnd({
                //     success: function (res) {
                //         stopWave();
                //     }
                // });

              }
            })
          }
        })
      }
    },
    ready: function (obj) {
      wx.ready(function () {
        //debugger
        //alert(app.wechatjs.share_config.share_url)
        if (app.wechatjs.share_config !== false) {
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
          })
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
          })
        }
      })
      wx.error(function (res) {
        tools.alert.error(res)
        location.href = location.href
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })
    }
  },

  /* 克隆对象 */
  extend: function (origin) {
    let originProto = Object.getPrototypeOf(origin)
    return Object.assign(Object.create(originProto), origin)
  },

  seeImg: function (curSrc, srcList) {
    if (!curSrc || !srcList || srcList.length == 0) {
      return
    }

    if (this.isWeChat()) {
      wx.previewImage({
        'current': curSrc,
        'urls': srcList
      })
    } else {

    }

  },

  /* 是否数组 */
  isArray: function isArray (args) {
    return Object.prototype.toString.call(args) === '[object Array]'
  },

  url: {
    params (key) {
      const result = {}
      let searches = location.search.replace(/^\?/, '').split('&')
      searches.forEach(item => {
        const arr = item.split('=')
        if (arr[0] && arr[1]) {
          result[arr[0]] = decodeURIComponent(arr[1])
        }
      })
      if (key) {
        return result[key]
      }
      return result
    }
  },

  //阿拉伯数字转数字
  getChinaNum: function (num) {
    var _change = {
      ary0: ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"],
      ary1: ["", "十", "百", "千"],
      ary2: ["", "万", "亿", "兆"],
      init: function (name) {
        this.name = name;
      },
      strrev: function () {
        var ary = []
        for (var i = this.name.length; i >= 0; i--) {
          ary.push(this.name[i])
        }
        return ary.join("");
      }, //倒转字符串。
      pri_ary: function () {
        var $this = this
        var ary = this.strrev();
        var zero = ""
        var newary = ""
        var i4 = -1
        for (var i = 0; i < ary.length; i++) {
          if (i % 4 == 0) { //首先判断万级单位，每隔四个字符就让万级单位数组索引号递增
            i4++;
            newary = this.ary2[i4] + newary; //将万级单位存入该字符的读法中去，它肯定是放在当前字符读法的末尾，所以首先将它叠加入$r中，
            zero = ""; //在万级单位位置的“0”肯定是不用的读的，所以设置零的读法为空

          }
          //关于0的处理与判断。
          if (ary[i] == '0') { //如果读出的字符是“0”，执行如下判断这个“0”是否读作“零”
            switch (i % 4) {
              case 0:
                break;
              //如果位置索引能被4整除，表示它所处位置是万级单位位置，这个位置的0的读法在前面就已经设置好了，所以这里直接跳过
              case 1:
              case 2:
              case 3:
                if (ary[i - 1] != '0') {
                  zero = "零"
                }
                ; //如果不被4整除，那么都执行这段判断代码：如果它的下一位数字（针对当前字符串来说是上一个字符，因为之前执行了反转）也是0，那么跳过，否则读作“零”
                break;

            }

            newary = zero + newary;
            zero = '';
          }
          else { //如果不是“0”
            newary = this.ary0[parseInt(ary[i])] + this.ary1[i % 4] + newary; //就将该当字符转换成数值型,并作为数组ary0的索引号,以得到与之对应的中文读法，其后再跟上它的的一级单位（空、十、百还是千）最后再加上前面已存入的读法内容。
          }

        }
        if (newary.indexOf("零") == 0) {
          newary = newary.substr(1)
        }//处理前面的0
        return newary;
      }
    }

    //创建class类
    function change() {
      this.init.apply(this, arguments);
    }

    change.prototype = _change

    //创建实例
    var k = new change(num.toString());
    return k.pri_ary();
  },

  /* 价格转换--保留两位小数 */
  toFixedPrice (value) {
    return value ? (parseInt(value) / 100).toFixed(2) : '0'
  },

  toPrice (value) {
    return value ? (parseInt(value) / 100) : '0'
  },

  thumbnail (val, size) {
    return utils.toThumbnail(val, size) || utils.defaultImg()
  },

  toThumbnail (val, size) {
    let img_size = '?x-oss-process=image/resize,w_' + size
    return !val ? '' : val + (!size ? '' : img_size)
  },

  // 伪克隆
  clone (data) {
    return JSON.parse(JSON.stringify(data || {}))
  },

  skuTool: {
    getSelectedProps (skuId, skus) {
      const sku = utils.find(skus, i => i.id === skuId)
      if (!sku) return null
      const result = {}
      sku.propertys.forEach(prop => {
        result[prop.sku_property_id] = prop.sku_property_value_id
      })
      return result
    },
    getSkuId (selectedProps, skus) {
      let matchSku
      skus.forEach(sku => {
        if (matchSku) return
        const isMatch = sku.propertys.every(prop => {
          return selectedProps[prop.sku_property_id] === prop.sku_property_value_id
        })
        if (isMatch) matchSku = sku
      })
      return matchSku ? matchSku.id : null
    },
    getSelectedSku (skuValue, skuModel) {
      if (!skuValue || !skuModel) return null
      const { skuId } = skuValue
      const { skus } = skuModel
      if (!skuId) return null
      const sku = utils.find(skus, i => i.id === skuId)
      return sku || null
    },
    getSelectedPropsText (selectedProps, property) {
      let strs = []
      Object.keys(selectedProps).forEach(propId => {
        const propValue = selectedProps[propId]
        const prop = utils.find(property, item => item.sku_property_id === +propId)
        if (prop) {
          const match = utils.find(prop.sku_property_value, item => item.sku_property_value_id === propValue)
          if (match) {
            strs.push(match.sku_property_value_name)
          }
        }
      })
      return strs.join(',')
    },
    getSkuText (sku) {
      if (!(sku && sku.id)) return ''
      return sku.value_name_array.join(',')
    }
  },

  find (array, predicate) {
    return array.filter(predicate)[0] || null
  },

  timeFormat (time, format = '{YYYY}-{Mo}-{Do} {H}:{mm}:{ss}') {
    let template = tinytime(format)
    if (time instanceof Date) {
      return template.render(time)
    } else if (typeof time === 'number') {
      return template.render(new Date(time))
    } else {
      return ''
    }
  },

  deleteObj (obj) {
    const _obj = obj
    for (let key in _obj) {
      if (!_obj[key]) {
        delete _obj.key
      }
    }
    return _obj
  },

  toId (val) {
    if (val === 0) return 0
    if (!val) return undefined
    return +val
  },

  getMonthDays (month, year) {
    const bigMonths = [1, 3, 5, 7, 8, 10, 12]
    if (month === 2) {
      const y = year || new Date().getFullYear()
      return utils.isLeapYear(y) ? 29 : 28
    } else if (bigMonths.indexOf(month) !== -1) {
      return 31
    } else {
      return 30
    }
  },

  isLeapYear (year) {
    return (year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0)
  }
}

export default utils
