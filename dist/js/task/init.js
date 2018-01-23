'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

task(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var _ref2, _ref3, maindata, progressUtil, rdata, encrypt, aesKey, iv, encryptedAES, adata, bindUser, gameinfo, iData, prize, gameconfig, game_detail, _game_detail, area_experience_full_ratio, fulltime, buju, init_game_coin, random_count, totalX, totalY, i, randomX;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.next = 2;
                    return require('data/maindata', 'util/progress');

                case 2:
                    _ref2 = _context3.sent;
                    _ref3 = _slicedToArray(_ref2, 2);
                    maindata = _ref3[0];
                    progressUtil = _ref3[1];


                    // 提示框点击关闭按钮
                    $('.layer_con_closebtn').click(function () {
                        var $e = $(this);
                        $e.parents('.tipslayer').hide();
                    });

                    // 说明按钮
                    $('#shuoming_btn').click(function () {
                        $('#start_tips').show();
                    });

                    // 接口初始化
                    _context3.next = 10;
                    return dataUtil.init();

                case 10:
                    _context3.next = 12;
                    return dataUtil.getras();

                case 12:
                    rdata = _context3.sent;

                    console.log('rdata => ', rdata);

                    // 生成公匙加密对象
                    encrypt = new JSEncrypt();

                    encrypt.setPublicKey(rdata.list.public_key_path);

                    // 生成aes字符串
                    // let aesKey = randomWord(false,32);
                    aesKey = "c33367701511b4f6020ec61ded352059";
                    iv = '82c9d98af578245f';

                    // 加密aes对称aseKey

                    encryptedAES = encrypt.encrypt(JSON.stringify({
                        "aes_key": aesKey
                    }));

                    // 3验证保存AES和获取长链地址

                    _context3.next = 21;
                    return dataUtil.postaes({
                        public_key_sign: encryptedAES,
                        type: 0
                    });

                case 21:
                    adata = _context3.sent;

                    console.log('获取socket接口 => ', adata);

                    bindUser = function () {
                        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client_id) {
                            var d2;
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            _context.next = 2;
                                            return dataUtil.bindUser({
                                                client_id: client_id,
                                                type: 0
                                            });

                                        case 2:
                                            d2 = _context.sent;

                                            console.log('绑定用户长链成功 => ', d2);

                                        case 4:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        }));

                        return function bindUser(_x) {
                            return _ref4.apply(this, arguments);
                        };
                    }();

                    _context3.next = 26;
                    return new Promise(function (res) {
                        // 4启动websocket
                        var ws = new WebSocket(adata.data.agreement + adata.data.ip + ":" + adata.data.port);
                        var isSoc = 0;
                        ws.onmessage = function () {
                            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(e) {
                                var data, coinbg, obj, fulltime, d;
                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                        switch (_context2.prev = _context2.next) {
                                            case 0:
                                                if (!isSoc) {
                                                    _context2.next = 12;
                                                    break;
                                                }

                                                data = JSON.parse(e.data);
                                                _context2.t0 = data.type;
                                                _context2.next = _context2.t0 === 'personal_experience' ? 5 : _context2.t0 === 'area_experience' ? 7 : 9;
                                                break;

                                            case 5:
                                                maindata.xf_zj = data.num_now;
                                                return _context2.abrupt('break', 9);

                                            case 7:
                                                maindata.all_xf = data.num_now;
                                                return _context2.abrupt('break', 9);

                                            case 9:

                                                // 判断是否需要放下硬币
                                                if (data.is_expend) {
                                                    coinbg = 'img/coin_' + data.prize_personal_type + '.png';

                                                    // 现在没有5和6的图，暂时用书包的那个代替

                                                    if (data.prize_personal_type == 5 || data.prize_personal_type == 6) {
                                                        coinbg = 'img/big_coin' + data.prize_personal_type + '.png';
                                                    }

                                                    obj = pz.addObject({
                                                        isBig: 1,
                                                        coinBG: coinbg,
                                                        bigType: data.prize_personal_type,
                                                        x: 100 + Math.random() * 200,
                                                        y: 60 + Math.random() * 100
                                                    });


                                                    if (data.prize_personal_type == 6) {
                                                        // 获取满服的时间
                                                        fulltime = gameconfig.data.full_area_space_time;

                                                        // 开始倒计时

                                                        progressUtil.countdown({
                                                            fulltime: fulltime,
                                                            percentage: 1
                                                        }).then(function () {
                                                            console.log('倒计时完成');
                                                            pz.removeCoinById("coin_6");
                                                        });
                                                        obj.id = 'coin_6';
                                                    } else {
                                                        // 设置id
                                                        obj.id = data.prize_id;
                                                    }
                                                }
                                                console.log('after socket', data);
                                                return _context2.abrupt('return');

                                            case 12:
                                                isSoc = 1;
                                                d = JSON.parse(e.data);

                                                console.log('拼接完成', d);
                                                _context2.next = 17;
                                                return bindUser(d.data);

                                            case 17:
                                                res();

                                            case 18:
                                            case 'end':
                                                return _context2.stop();
                                        }
                                    }
                                }, _callee2, undefined);
                            }));

                            return function (_x2) {
                                return _ref5.apply(this, arguments);
                            };
                        }();
                    });

                case 26:
                    _context3.next = 28;
                    return dataUtil.gameinfo();

                case 28:
                    gameinfo = _context3.sent;
                    iData = gameinfo.data;

                    // 设置伸长和震动
                    // 道具数

                    maindata.elong = iData.prop[1];
                    maindata.shake = iData.prop[2];

                    prize = iData.prize;

                    maindata.b1 = prize[1];
                    maindata.b2 = prize[2];
                    maindata.b3 = prize[3];
                    maindata.b4 = prize[4];
                    maindata.b5 = prize[5];
                    maindata.b6 = prize[6];

                    console.log('gameinfo', iData);

                    // 更新硬币
                    maindata.coin = iData.coin;
                    maindata.integral = iData.integral;

                    // 获取游戏配置数据
                    _context3.next = 44;
                    return dataUtil.gameconfig();

                case 44:
                    gameconfig = _context3.sent;
                    game_detail = void 0;

                    if (gameconfig.status) {
                        game_detail = gameconfig.data.game_detail;
                        // 设置两个总值
                        maindata.area_experience_num = game_detail.area_experience_num;
                        maindata.personal_experience_num = game_detail.personal_experience_num;

                        // 幸福值
                        maindata.xf_zj = game_detail.personal_experience_num_now;

                        // 全区幸福值
                        maindata.all_xf = game_detail.area_experience_num_now;

                        // 判断是否倒计时中
                        _game_detail = game_detail, area_experience_full_ratio = _game_detail.area_experience_full_ratio;

                        if (area_experience_full_ratio > 0) {
                            // 获取满服的时间
                            fulltime = gameconfig.data.full_area_space_time;
                            // 开始倒计时

                            progressUtil.countdown({
                                fulltime: fulltime,
                                percentage: area_experience_full_ratio
                            }).then(function () {
                                console.log('倒计时完成');
                                pz.removeCoinById("coin_6");
                            });
                        } else {
                            pz.removeCoinById("coin_6");
                        }
                    }
                    console.log('gameconfig', gameconfig);

                    // 判断是否有历史数据

                    if (!(!GetQueryString('reload') && game_detail.game_detail)) {
                        _context3.next = 55;
                        break;
                    }

                    buju = JSON.parse(game_detail.game_detail);
                    // 还原布局

                    buju.forEach(function (e) {
                        var o = {
                            x: e.x,
                            y: e.y
                        };

                        if (e.bigType) {
                            o.bigType = e.bigType;
                            o.isBig = 1;

                            var coinbg = 'img/coin_' + e.bigType + '.png';

                            // 现在没有5和6的图，暂时用书包的那个代替
                            if (e.bigType == 5 || e.bigType == 6) {
                                coinbg = 'img/big_coin' + e.bigType + '.png';
                            }

                            o.coinBG = coinbg;
                        }
                        var obj = pz.addObject(o);
                        e.id && (obj.id = e.id);
                    });

                    // 重新删掉coin6
                    if (!game_detail.area_experience_full_ratio) {
                        pz.removeCoinById("coin_6");
                    }

                    console.log('buju', buju);
                    _context3.next = 62;
                    break;

                case 55:
                    // 获取初始分配
                    init_game_coin = gameconfig.data.init_game_coin;
                    random_count = init_game_coin.min + Math.floor((init_game_coin.max - init_game_coin.min) * Math.random());

                    // 平铺普通硬币

                    totalX = 15;
                    totalY = 80;

                    // 随机添加

                    for (i = 0; i < random_count; i++) {
                        randomX = Math.round(Math.random() * 10);

                        pz.addObject({
                            x: totalX + randomX,
                            y: totalY + randomX
                        });
                        totalX += 30;
                        if (totalX >= 400) {
                            totalY += 32;
                            totalX = 15;
                        }
                    }

                    // 判断是否安静下来
                    _context3.next = 62;
                    return new Promise(function (res) {
                        pz.one('anjing', function () {
                            res();
                        });
                    });

                case 62:
                case 'end':
                    return _context3.stop();
            }
        }
    }, _callee3, undefined);
})));