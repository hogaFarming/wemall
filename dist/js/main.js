"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var total, now, addOne, startLoading;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    // 设置根目录
                    drill.config({
                        baseUrl: "js/"
                    });

                    // 总数
                    total = 13;
                    now = 0;

                    // 递增进度

                    addOne = function addOne() {
                        now++;
                        var p = now / total;
                        startLoading.css('width', p * 370 + "px");

                        if (now == total) {
                            setTimeout(function () {
                                // 进场
                                $('#start_loading').one('animationend animationEnd webkitAnimationEnd', function () {
                                    $('#start_loading').hide();
                                    $('.container').css('opacity', 1);

                                    // 开始初始提示
                                    $('#start_tips').show();
                                }).addClass('fade_out');
                            }, 100);
                        }
                    };

                    // 现在入基础库


                    _context.next = 6;
                    return require('js/jquery-2.2.0.min -r');

                case 6:
                    // max-width=370 min-width=0
                    startLoading = $('#start_loading_progress');

                    addOne();

                    // 判断是否长屏幕
                    if (screen.height / screen.width >= 2) {
                        $('.p_scenes_outer').css({
                            'bottom': '190px'
                        });
                        $('.desk_bottom').css({
                            'width': "527px",
                            'height': "auto",
                            'left': "-15px",
                            'bottom': "-280px"
                        });
                        $('.desk_bottom img').attr('src', 'img/new_bottom.png');
                    }

                    // 载入游戏框架
                    _context.next = 11;
                    return require('sanlie');

                case 11:
                    addOne();

                    // 载入数据处理模块
                    _context.next = 14;
                    return require('data/dataUtil', 'js/data/aes -r', 'js/data/jsencrypt.min -r', 'js/data/md5 -r').pend(addOne);

                case 14:
                    _context.next = 16;
                    return require('js/data/pad-zeropadding-min -r');

                case 16:
                    addOne();

                    // 初始化平铺硬币
                    _context.next = 19;
                    return require('task/init');

                case 19:
                    addOne();
                    _context.next = 22;
                    return require('task/openPaw', 'task/elong', 'task/shake', 'task/duihuan', 'task/beibao').pend(addOne);

                case 22:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}))();