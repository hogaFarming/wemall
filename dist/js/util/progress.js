'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

define(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(require) {
        var main_progree_mid, maindata;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        main_progree_mid = $('.main_progree_mid');
                        _context.next = 3;
                        return require('data/maindata');

                    case 3:
                        maindata = _context.sent;
                        return _context.abrupt('return', {
                            // 倒计时方法
                            countdown: function countdown(defaults) {
                                return new Promise(function (res) {
                                    // defaults = {
                                    //     // 总时间
                                    //     fulltime: 180,
                                    //     // 当前进度
                                    //     percentage: 1
                                    // };
                                    var percentage = defaults.percentage;

                                    // 计算一个百分比的值
                                    var per_time = 1 / defaults.fulltime;

                                    // 禁止默认音乐
                                    $('#main_audio')[0].pause();
                                    $('#quanfu_audio')[0].play();

                                    var timer = setInterval(function () {
                                        // 重新计算
                                        percentage -= per_time;
                                        if (percentage <= 0) {
                                            clearInterval(timer);
                                            percentage = 0;
                                            res();

                                            // 替换bgm
                                            $('#main_audio')[0].play();
                                            $('#quanfu_audio')[0].pause();
                                        }

                                        // 更新长度
                                        main_progree_mid.css('width', percentage * 370 + 'px');

                                        // 更新文本
                                        var c = maindata.area_experience_num * percentage;
                                        if (maindata.area_experience_num < 50) {
                                            c = c.toFixed(2);
                                        }
                                        if (c <= 0) {
                                            c = 0;
                                        }
                                        maindata.all_xf = c;
                                    }, 1000);
                                });
                            }
                        });

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());