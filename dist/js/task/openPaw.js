'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 点击了放下按钮
task(function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(require) {
        var maindata, isopenpaw;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return require('data/maindata');

                    case 2:
                        maindata = _context3.sent;


                        // 放下硬币按钮
                        $('#open_paw_btn').click(function () {
                            if (maindata.coin <= 0) {
                                return;
                            }
                            pz.openPaw();
                        });

                        isopenpaw = 1;

                        pz.on('openPaw', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            var d;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            setTimeout(function () {
                                                $('#yingbi_audio')[0].play();
                                            }, 100);
                                            console.log('放下了硬币');
                                            maindata.coin--;
                                            isopenpaw = 1;
                                            // 调用投币接口
                                            _context.next = 6;
                                            return dataUtil.putdowncoin();

                                        case 6:
                                            d = _context.sent;

                                            console.log('投币', d);

                                        case 8:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        })));

                        // 记录器
                        pz.on('turn_diret', function (e, data) {
                            if (data == 0 && isopenpaw) {
                                isopenpaw = 0;
                                setTimeout(function () {
                                    // 保存结果上去
                                    dataUtil.saveDesk();
                                }, 100);
                            }
                        });

                        // 硬币落下后
                        pz.on('fall', function () {
                            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e, data) {
                                var ld, gdata;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                ld = {
                                                    // （0:金币，1:碎片）
                                                    type: 0,
                                                    value: 1,
                                                    // 碎片类型（1:碎片1，2:碎片2，3:碎片，4:碎片4）
                                                    // type_prize:1,
                                                    time: new Date().getTime()

                                                    // 掉落的是碎片
                                                };
                                                if (data.bigType) {
                                                    ld.type = 1;
                                                    ld.type_prize = data.bigType;
                                                    ld.value = data.id;
                                                    maindata["b" + data.bigType]++;
                                                } else {
                                                    maindata.coin++;
                                                }
                                                _context2.next = 4;
                                                return dataUtil.gameresult({
                                                    data: JSON.stringify(ld)
                                                });

                                            case 4:
                                                gdata = _context2.sent;

                                                console.log('掉落硬币上传结果 => ', gdata);

                                                // 保存结果上去
                                                dataUtil.saveDesk();

                                            case 7:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x2, _x3) {
                                return _ref3.apply(this, arguments);
                            };
                        }());

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