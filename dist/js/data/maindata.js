'use strict';

define(function () {
    var obj = {};

    // 硬币
    var coin = 0;
    //积分
    var integral = 0;
    // 自己的幸福度
    var xf_zj = 0;
    // 全服幸福度
    var all_xf = 0;
    // 伸长工具
    var elong = 0;
    // 震动工具
    var shake = 0;

    // 剩下的几个大硬币
    var b1 = 0;
    var b2 = 0;
    var b3 = 0;
    var b4 = 0;
    var b5 = 0;
    var b6 = 0;

    Object.defineProperties(obj, {
        coin: {
            get: function get() {
                return coin;
            },
            set: function set(d) {
                coin = d;
                // 更新硬币数量
                $('#use_coin').text(coin);
                $('#duihuan1_page .duihuan1_2').text(coin);
                $('#duihuan3_page .duihuan2_text').text(coin);
                $('#duihuan3_page .duihuan2_textinput input').attr('placeholder', '\u4F60\u7684\u91D1\u5E01\u6700\u591A\u5151\u6362' + Math.floor(coin * 100) + '\u79EF\u5206');
            }
        },
        integral: {
            get: function get() {
                return integral;
            },
            set: function set(d) {
                integral = d;
                // 更新积分
                $('#duihuan1_page .duihuan1_1').text(integral);
                $('#duihuan2_page .duihuan2_text').text(integral);
                $('#duihuan2_page .duihuan2_textinput input').attr('placeholder', '\u4F60\u7684\u79EF\u5206\u6700\u591A\u5151\u6362' + Math.floor(integral / 100) + '\u91D1\u5E01');
            }
        },
        xf_zj: {
            get: function get() {},
            set: function set(d) {
                xf_zj = d;
                $('.center_progress_text').text(xf_zj + ' / ' + this.personal_experience_num);
                $('.center_progress_inner').css('width', xf_zj / this.personal_experience_num * 100 + '%');
            }
        },
        all_xf: {
            get: function get() {
                return all_xf;
            },
            set: function set(d) {
                all_xf = d;
                $('#all_xf_progress .main_progree_text').text(d + ' / ' + this.area_experience_num);
                $('#all_xf_progress .main_progree_mid').css('width', d / this.area_experience_num * 370 + 'px');
            }
        },
        elong: {
            get: function get() {
                return elong;
            },
            set: function set(d) {
                elong = d;
                $('#elong_btn .o_btn_pop').text(elong);
            }
        },
        shake: {
            get: function get() {
                return shake;
            },
            set: function set(d) {
                shake = d;
                $('#shake_btn .o_btn_pop').text(shake);
            }
        },
        // 几个大硬币变化
        b1: {
            get: function get() {
                return b1;
            },
            set: function set(d) {
                b1 = d;
                $('#b1_text').text(d);
            }
        },
        b2: {
            get: function get() {
                return b2;
            },
            set: function set(d) {
                b2 = d;
                $('#b2_text').text(d);
            }
        },
        b3: {
            get: function get() {
                return b3;
            },
            set: function set(d) {
                b3 = d;
                $('#b3_text').text(d);
            }
        },
        b4: {
            get: function get() {
                return b4;
            },
            set: function set(d) {
                b4 = d;
                $('#b4_text').text(d);
            }
        },
        b5: {
            get: function get() {
                return b4;
            },
            set: function set(d) {
                b4 = d;
                $('#b5_text').text(d);
            }
        },
        b6: {
            get: function get() {
                return b4;
            },
            set: function set(d) {
                b4 = d;
                $('#b6_text').text(d);
            }
        },
        // 两个总数
        area_experience_num: {
            value: 0,
            writable: true
        },
        personal_experience_num: {
            value: 0,
            writable: true
        }
    });

    return obj;
});