'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 物体散列开模拟
(function (glo) {
    // public class
    var P_object = function () {
        function P_object(options) {
            _classCallCheck(this, P_object);

            // 初始化主体元素
            this.ele = $('<div class="p_object">\n                <div class="p_object_t"></div>\n                <div class="p_object_in"></div>\n            </div>');

            if (options.isBig) {
                this.ele.empty().append('<div class="p_object_bigin" style="background-image:url(' + options.coinBG + ')"></div>').css('z-index', 3);
            }

            this.rele = this.ele.find('.p_object_in');

            // 运动的能量
            this.enX = 0;
            this.enY = 0;

            // xy轴
            this._x = 0;
            this._y = 0;

            // z轴
            this.z = 0;

            // 旋转角度
            this._rotate = 0;
        }

        _createClass(P_object, [{
            key: 'fall',
            value: function fall(direct) {
                var _this = this;

                switch (direct) {
                    case "left":
                        this.ele.children().wrap('<div class="anime_in_con left_fall_anime" style="position:absolute;width:100%;height:100%;top:0;left:0;"></div>');
                        break;
                    case "right":
                        this.ele.children().wrap('<div class="anime_in_con right_fall_anime" style="position:absolute;width:100%;height:100%;top:0;left:0;"></div>');
                        break;
                    case "bottom":
                        this.ele.children().wrap('<div class="anime_in_con bottom_fall_anime" style="position:absolute;width:100%;height:100%;top:0;left:0;"></div>');
                        break;
                }
                // 在数组内移除它
                objCon.splice(objCon.indexOf(this), 1);
                this.ele.find('.anime_in_con').one('animationend animationEnd webkitAnimationEnd', function () {
                    _this.ele.remove();
                });
                // setTimeout(() => {
                //     this.ele.remove();
                // }, 400);
            }
        }, {
            key: 'x',
            get: function get() {
                return this._x;
            },
            set: function set(val) {
                var x = this._x = val;
                this.ele.css({
                    '-webkit-transform': 'translate3d(' + (x - 15) + 'px,' + (this._y - 15) + 'px,0)',
                    transform: 'translate3d(' + (x - 15) + 'px,' + (this._y - 15) + 'px,0)'
                    // left: x - 15 + "px",
                    // top: this._y - 15 + "px"
                });
            }
        }, {
            key: 'y',
            get: function get() {
                return this._y;
            },
            set: function set(val) {
                var y = this._y = val;
                this.ele.css({
                    '-webkit-transform': 'translate3d(' + (this._x - 15) + 'px,' + (y - 15) + 'px,0)',
                    transform: 'translate3d(' + (this._x - 15) + 'px,' + (y - 15) + 'px,0)'
                    // left: this._x - 15 + "px",
                    // top: y - 15 + "px"
                });
            }
        }, {
            key: 'rotate',
            get: function get() {
                return this._rotate;
            },
            set: function set(val) {
                this._rotate = val;
                this.rele.css({
                    "-webkit-transform": 'rotate(' + val + 'deg)',
                    "transform": 'rotate(' + val + 'deg)'
                });
            }
        }]);

        return P_object;
    }();

    // 主体容器


    var p_scenes = $('.p_scenes');

    // 顶部推动器
    var topBox = $('.topbox');

    var move_paw = $('.move_paw');
    var move_paw_x = 0;
    var move_paw_max_x = $('.move_station').width() - move_paw.width();
    // 爪子一帧移动的距离
    var move_paw_space = 1;
    // 爪子的移动方向
    var move_paw_direct = 1;

    // 总的元素库
    var objCon = [];

    // 顶部推动器参数
    var topbox_spaceY = 0.5;
    var topbox_miny = 0;
    var topbox_maxy = 50;
    // 当前的y值
    var topbox_y = 0;
    // 顶部箱的方向
    var topbox_direct = 1;

    // 能否放开爪子
    var can_open_paw = 1;

    // 暴露给外面的方法
    var controlObject = $.extend($({}), {
        objCon: objCon,
        // 添加一个物体的方法
        addObject: function addObject(options) {
            // 生成对象
            var obj = new P_object(options);

            // 设置初始定位
            obj.x = options.x;
            obj.y = options.y;
            // if (options.z) {
            //     obj.z = options.z
            //     obj.ele.css('z-index', 2)
            // }

            // 写下类型
            if (options.bigType) {
                obj.bigType = options.bigType;
                obj.ele.css('z-index', 3);
                obj.z = 3;
            }

            // 添加元素
            p_scenes.append(obj.ele);
            objCon.push(obj);

            if (options.class) {
                obj.ele.addClass(options.class);
                obj.class = options.class;
            }

            return obj;
        },
        // 设定顶部移动栏的相关信息
        setTopBox: function setTopBox(options) {
            var defaults = {
                // 每帧移动的距离
                spaceY: 1,
                // 最小y
                minY: 0,
                // 最大y轴值
                maxY: 50
            };
            $.extend(defaults, options);

            topbox_spaceY = defaults.spaceY;
            topbox_miny = defaults.minY;
            topbox_maxy = defaults.maxY;
        },
        // 设置爪子的信息
        setPaw: function setPaw() {},
        // 放开爪子
        openPaw: function openPaw() {
            if (!can_open_paw) {
                return;
            }

            can_open_paw = 0;
            controlObject.trigger('openPaw');
            $('.move_paw_coin').hide();
            // 切换图片
            $('.move_paw_bg').addClass('open_mode');
            setTimeout(function () {
                $('.move_paw_bg').removeClass('open_mode');
                $('.move_paw_coin').show();
                can_open_paw = 1;
            }, 1000);

            // 获取硬币的位置，并开始下落
            var paw_coin_x = move_paw_x + 20;
            var paw_coin_y = 35;

            // 添加一个硬币
            var coinEle = $('<div class="drop_coin"></div>').css({
                top: paw_coin_y + "px",
                left: paw_coin_x + "px"
            });
            $('.move_station').append(coinEle);

            // 动画结束后设置在台上
            coinEle.on('animationend animationEnd webkitAnimationEnd', function () {
                // 添加一颗硬币在台面上
                pz.addObject({
                    // x: paw_coin_x + 15 + bottom_sanjiao_width,
                    x: paw_coin_x + 15,
                    y: 20
                });
                coinEle.remove();
            });
        },
        // 震动
        shake: function shake() {
            $('.p_scenes_outer').addClass('shake_scenes');
            $('.p_scenes_outer').one('animationend animationEnd webkitAnimationEnd', function () {
                $('.p_scenes_outer').removeClass('shake_scenes');
            });
            // 添加能量
            objCon.forEach(function (e) {
                e.enY += Math.random() * 20;
            });
            controlObject.trigger('shake');
        },
        // 伸长
        elong: function elong() {
            topbox_direct = 1;
            topbox_maxy = 100;
            controlObject.one('turn_diret', function (e, data) {
                topbox_maxy = 50;
            });
            controlObject.trigger('elong');
        },
        // 获取所有硬币定位
        getPosition: function getPosition() {
            var rarr = [];
            objCon.forEach(function (e) {
                var o = {
                    x: parseInt(e.x),
                    y: parseInt(e.y)
                };
                e.bigType && (o.bigType = e.bigType);
                e.id && (o.id = e.id);
                rarr.push(o);
            });
            // rarr.forEach((e)=>{delete e.bigType})
            // rarr.forEach((e)=>{delete e.id})
            return rarr;
        },

        // 去除某个硬币
        removeCoinById: function removeCoinById(id) {
            var tarObj = void 0;
            objCon.some(function (e) {
                if (e.id == id) {
                    tarObj = e;
                    return true;
                }
            });
            // 在数组内移除它
            objCon.splice(objCon.indexOf(tarObj), 1);
            // 渐变去除
            tarObj && tarObj.ele.fadeOut(function () {
                tarObj.ele.remove();
            });
        }
    });

    glo.pz = controlObject;

    // 原的半径 像素
    var circle_radius = 15;
    // 圆的直径
    var circle_diameter = circle_radius * 2;
    // 距离下面斜边的极值
    var circle_bottom_radio = Math.sqrt(circle_radius * circle_radius + circle_radius * circle_radius);

    // 最小一帧的位移
    var distance_space = 0.5;

    // 能量转距离比率
    var enRatio = 20;

    // 每帧衰减能量值
    var attenEn = 0.5;

    // 计算桌面底部的长度
    var deskHeight = $('.p_scenes').height();

    // 底部偏差三角的偏差直径
    // let bottom_sanjiao_width = 100;

    // 最左安全域
    // let minLeft = bottom_sanjiao_width + 15;
    // let maxLeft = bottom_sanjiao_width + 385;
    var minLeft = 15;
    var maxLeft = 385;

    // 判断是否安静的reduce
    var anjing_timeout = 0;
    var anjingReduce = function anjingReduce(func) {
        if (anjing_timeout) {
            return;
        }
        anjing_timeout = 1;
        setTimeout(function () {
            func();
            anjing_timeout = 0;
        }, 500);
    };

    // 刷新帧的方法
    var before_timestamp = 0;
    var refreshFrame = function refreshFrame(timestamp) {
        // 是否安静了
        var is_anjing = 1;

        var mul_time = Math.floor(timestamp - before_timestamp) / 16;
        if (timestamp < 5000) {
            mul_time = 1;
        }
        if (mul_time > 10) {
            mul_time = 10;
        }
        // 移动爪子
        if (move_paw_direct) {
            move_paw_x += move_paw_space * mul_time;
        } else {
            move_paw_x -= move_paw_space * mul_time;
        }
        move_paw.css({
            '-webkit-transform': 'translate3d(' + move_paw_x + 'px,0,0)',
            'transform': 'translate3d(' + move_paw_x + 'px,0,0)'
        });
        if (move_paw_x >= move_paw_max_x) {
            move_paw_direct = 0;
        } else if (move_paw_x <= 0) {
            move_paw_direct = 1;
        }

        // 是否切换方向
        var isChangeDirect = false;
        var before_topbox_direct = topbox_direct;

        if (topbox_direct) {
            // 顶部栏推动器的位移
            topbox_y += topbox_spaceY * mul_time;
        } else {
            topbox_y -= topbox_spaceY * mul_time;
        }
        topBox.css({
            '-webkit-transform': 'translate3d(0,' + topbox_y + 'px,0px)',
            'transform': 'translate3d(0,' + topbox_y + 'px,0px)'
        });
        if (topbox_y > topbox_maxy) {
            topbox_direct = 0;
            controlObject.trigger('turn_diret', 0);
        } else if (topbox_y < topbox_miny) {
            topbox_direct = 1;
            controlObject.trigger('turn_diret', 1);
        }
        isChangeDirect = before_topbox_direct !== topbox_direct;

        var ttop = topbox_y + 15;
        var topbox_maxy_addy = topbox_miny + topbox_y;
        // 遍历元素
        objCon.forEach(function (e) {
            // 判断当前圆有没有与顶部box重叠
            var ey_noradio = e.y - circle_radius;
            if (ey_noradio + 5 < topbox_maxy_addy) {
                e.y += distance_space * mul_time;
            } else if (ey_noradio < topbox_maxy_addy) {
                e.y = ttop;

                if (isChangeDirect) {
                    // 添加固定y轴能量
                    e.enY = 10;
                }
            }

            // 判断是否有z轴的数据
            if (!e.z) {
                objCon.forEach(function (e2) {
                    if (e2.z) {
                        return;
                    }
                    // 判断圈内是否有重叠的，重叠的就进行排斥
                    if (e != e2) {
                        // 判断在这个圆半径内的其他圆，就传递能量
                        var d = Math.sqrt(Math.pow(e.x - e2.x, 2) + Math.pow(e.y - e2.y, 2));
                        if (d <= circle_diameter) {
                            is_anjing = 0;
                            // 获取差值
                            var diffX = e.x - e2.x;
                            var diffY = e.y - e2.y;

                            var above_circle = e.above_circle;

                            // 根据差值，相互增加像素值
                            if (diffX > 0) {
                                e.x += distance_space * mul_time;
                                e2.x -= distance_space * mul_time;
                                e.rotate++;
                                if (above_circle) {
                                    above_circle.x += distance_space / 3 * mul_time;
                                }
                            } else {
                                e.x -= distance_space * mul_time;
                                e2.x += distance_space * mul_time;
                                e.rotate--;
                                if (above_circle) {
                                    above_circle.x -= distance_space / 3 * mul_time;
                                }
                            }

                            if (diffY > 0) {
                                e.y += distance_space * mul_time;
                                e2.y -= distance_space / 2 * mul_time;
                                if (above_circle) {
                                    above_circle.y += distance_space / 3 * mul_time;
                                }
                            } else {
                                e.y -= distance_space / 2 * mul_time;
                                e2.y += distance_space * mul_time;
                            }

                            if (above_circle) {
                                e.above_circle = null;
                            }
                        }
                    }
                });
            } else {
                var has_above = 0;
                // 判断与那些重合
                objCon.forEach(function (e2) {
                    if (e != e2) {
                        // 判断所有是否在圆心内
                        var distance = Math.sqrt(Math.pow(e.x - e2.x, 2) + Math.pow(e.y - e2.y, 2));
                        if (distance <= circle_diameter && !e2.z) {
                            // 设置寄托
                            e2.above_circle = e;
                            has_above = 1;
                        }
                    }
                });
                if (!has_above) {
                    e.z = 0;
                }
            }

            // 有能量的话进行速度距离叠加
            if (e.enY) {
                var distanceY = e.enY / enRatio;
                e.y += distanceY;
                // 衰减能量
                e.enY -= attenEn;
                if (e.enY < 0) {
                    e.enY = 0;
                }
                is_anjing = 0;
            }

            // 超过左右侧安全区域的，进行纠正
            if (e.y > 265) {
                // 判断是否在边缘曲线内
                // debugger
                if (e.x < minLeft - 15) {
                    // 添加下落动画
                    e.fall('left');
                    is_anjing = 0;
                } else if (e.x > maxLeft + 15) {
                    // 添加下落动画
                    e.fall('right');
                    is_anjing = 0;
                }
            } else {
                if (e.x < minLeft) {
                    e.x = minLeft;
                    is_anjing = 0;
                } else if (e.x > maxLeft) {
                    e.x = maxLeft;
                    is_anjing = 0;
                }
            }

            // 超过下侧安全区域的，进行移除
            if (e.y > deskHeight) {
                e.fall('bottom');
                is_anjing = 0;
                controlObject.trigger('fall', e);
            }
        });

        before_timestamp = timestamp;

        if (is_anjing) {
            anjingReduce(function () {
                controlObject.trigger('anjing');
            });
        }

        // 回调刷新帧
        requestAnimationFrame(refreshFrame);
    };

    // 点火
    requestAnimationFrame(refreshFrame);
})(window);