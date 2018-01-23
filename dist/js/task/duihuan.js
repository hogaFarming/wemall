'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

task(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(require) {
        var maindata;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return require('data/maindata');

                    case 2:
                        maindata = _context3.sent;


                        $('#duihuan_btn').click(function () {
                            $('#duihuan1_page').show();
                        });

                        $('.duihuan1_btn1').click(function () {
                            $('#duihuan2_page').show();
                        });

                        $('.duihuan1_btn2').click(function () {
                            $('#duihuan3_page').show();
                        });

                        // 积分兑换硬币
                        $('#duihuan2_page .duihuan2_btn').click(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var d2, d3;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            d2 = $('#duihuan2_page input').val();

                                            d2 = parseInt(d2);

                                            if (!(d2 && d2 > 0)) {
                                                _context.next = 18;
                                                break;
                                            }

                                            if (!(d2 % 100)) {
                                                _context.next = 6;
                                                break;
                                            }

                                            alert('必须是100的整数');
                                            return _context.abrupt('return');

                                        case 6:
                                            if (!(d2 <= maindata.integral)) {
                                                _context.next = 15;
                                                break;
                                            }

                                            console.log('开始兑换硬币', d2);
                                            _context.next = 10;
                                            return dataUtil.excoin({
                                                num: d2,
                                                type_for: 0,
                                                type: 0
                                            });

                                        case 10:
                                            d3 = _context.sent;

                                            if (d3 && d3.status) {
                                                // 减少积分
                                                maindata.integral -= d2;

                                                // 增加硬币
                                                maindata.coin += d2 / 100;

                                                $('#duihuan2_page input').val("");

                                                alert('兑换硬币成功');
                                            } else {
                                                alert('兑换出错');
                                            }
                                            console.log('兑换硬币成功', d3);
                                            _context.next = 16;
                                            break;

                                        case 15:
                                            alert('积分不够');

                                        case 16:
                                            _context.next = 19;
                                            break;

                                        case 18:
                                            alert('输入错误');

                                        case 19:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        })));

                        // 硬币兑换积分
                        $('#duihuan3_page .duihuan2_btn').click(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                            var d2, d3;
                            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                while (1) {
                                    switch (_context2.prev = _context2.next) {
                                        case 0:
                                            d2 = $('#duihuan3_page input').val();

                                            d2 = parseInt(d2);

                                            if (!(d2 && d2 > 0)) {
                                                _context2.next = 15;
                                                break;
                                            }

                                            if (!(d2 <= maindata.integral)) {
                                                _context2.next = 12;
                                                break;
                                            }

                                            console.log('开始兑换积分', d2);
                                            _context2.next = 7;
                                            return dataUtil.excoin({
                                                num: d2,
                                                type_for: 1,
                                                type: 0
                                            });

                                        case 7:
                                            d3 = _context2.sent;

                                            if (d3 && d3.status) {
                                                // 减少积分
                                                maindata.integral += d2 * 100;

                                                // 增加硬币
                                                maindata.coin -= d2;

                                                $('#duihuan3_page input').val("");

                                                alert('兑换积分成功');
                                            } else {
                                                alert('兑换出错');
                                            }
                                            console.log('兑换积分成功', d3);
                                            _context2.next = 13;
                                            break;

                                        case 12:
                                            alert('积分不够');

                                        case 13:
                                            _context2.next = 16;
                                            break;

                                        case 15:
                                            alert('输入错误');

                                        case 16:
                                        case 'end':
                                            return _context2.stop();
                                    }
                                }
                            }, _callee2, undefined);
                        })));

                    case 8:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x) {
        return _ref.apply(this, arguments);
    };
}());