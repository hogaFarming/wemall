'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 设置舞台的
// let totalX = 15 + 100;
var totalX = 15;
var totalY = 80;
// 随机添加
for (var i = 0; i < 110; i++) {
    var randomX = Math.round(Math.random() * 10);
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

// 使用币数
var user_count = 100;

// 掉落的个数
var fall_count = 0;

pz.on('openPaw', function () {
    user_count--;
    $('#use_coin').text(user_count);
});

// 放下硬币按钮
$('#open_paw_btn').click(function () {
    pz.openPaw();
});

// 震一震按钮
$('#shake_btn').click(function () {
    pz.shake();
});

// 伸长按钮
$('#elong_btn').click(function () {
    pz.elong();
});

// 掉落添加
pz.on('fall', function () {
    user_count++;
    $('#use_coin').text(user_count);
});

// 放下大硬币1
pz.addObject({
    isBig: 1,
    coinBG: "img/coin_1.png",
    x: 100,
    y: 100
});

// 放下大硬币2
pz.addObject({
    isBig: 1,
    coinBG: "img/coin_2.png",
    x: 300,
    y: 100
});

// 放下大硬币3
pz.addObject({
    isBig: 1,
    coinBG: "img/coin_3.png",
    x: 100,
    y: 200
});

// 放下大硬币4
pz.addObject({
    isBig: 1,
    coinBG: "img/coin_4.png",
    x: 300,
    y: 200
});

for (var _i = 0; _i < 4; _i++) {
    // 放几颗在表面
    pz.addObject({
        z: true,
        x: 150 + _i * 30,
        y: 100 + _i * 10
    });
}

for (var _i2 = 0; _i2 < 4; _i2++) {
    // 放几颗在表面
    pz.addObject({
        z: true,
        x: 150 + _i2 * 30,
        y: 200 + _i2 * 10
    });
}

// 进度改变
var main_progree_mid = $('.main_progree_mid');
var main_progree_text = $('.main_progree_text');
setInterval(function () {
    var random_val = Math.random();
    main_progree_mid.css('width', random_val * 370 + 'px');
    main_progree_text.text(Math.floor(50000 * random_val) + ' / 50000');
}, 3000);

// 先把所有接口跑完流程
_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var rdata, encrypt, aesKey, iv, encryptedAES, adata, ws, isSoc, bindUser;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    _context2.next = 2;
                    return dataUtil.init();

                case 2:
                    _context2.next = 4;
                    return dataUtil.getras();

                case 4:
                    rdata = _context2.sent;

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

                    _context2.next = 13;
                    return dataUtil.postaes({
                        public_key_sign: encryptedAES,
                        type: 0
                    });

                case 13:
                    adata = _context2.sent;

                    console.log('获取socket接口 => ', adata);

                    // 4启动websocket
                    ws = new WebSocket(adata.data.agreement + adata.data.ip + ":" + adata.data.port);
                    isSoc = 0;

                    ws.onmessage = function (e) {
                        if (isSoc) {
                            return;
                        }
                        isSoc = 1;
                        var d = JSON.parse(e.data);
                        console.log('拼接完成', d);
                        bindUser(d.data);
                    };

                    // 转换aeskey object
                    // let aesKey2 = CryptoJS.enc.Utf8.parse(aesKey);
                    // iv = CryptoJS.enc.Utf8.parse(iv);

                    // 5绑定用户长链关系

                    bindUser = function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(client_id) {
                            var d2, d3, data, key, a, b, c, d4, daojuData, gameinfo, putdowncoindata, propuse_data;
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

                                            // 6尝试交换硬币
                                            _context.next = 6;
                                            return dataUtil.excoin({
                                                num: 5,
                                                type_for: 1,
                                                type: 0
                                            });

                                        case 6:
                                            d3 = _context.sent;

                                            console.log('交换硬币成功', d3);

                                            // 上报结果
                                            // let rs1 = {
                                            //     "type": 1,
                                            //     "value": 10023,
                                            //     "type_prize": 4,
                                            //     "time": 1513175453
                                            // };
                                            // rs1 = JSON.stringify(rs1);

                                            data = '{"type":1,"value":10023,"type_prize":3,"time":1513175453}';

                                            // aes对称加密

                                            key = CryptoJS.enc.Latin1.parse(aesKey);
                                            a = CryptoJS.AES.encrypt(data, key, {
                                                iv: CryptoJS.enc.Latin1.parse(iv),
                                                mode: CryptoJS.mode.CBC,
                                                padding: CryptoJS.pad.ZeroPadding
                                            });
                                            b = CryptoJS.MD5(a.toString()).toString();
                                            c = a + b;

                                            // 7结果上报

                                            _context.next = 15;
                                            return dataUtil.gameresult({
                                                data: c
                                            });

                                        case 15:
                                            d4 = _context.sent;

                                            console.log('上报结果成功', d4);

                                            // 8碎片兑换道具或积分
                                            _context.next = 19;
                                            return dataUtil.prizeevent({
                                                prize_id: 100,
                                                type: 0
                                            });

                                        case 19:
                                            daojuData = _context.sent;

                                            console.log('兑换道具', daojuData);

                                            // 9用户资产信息
                                            _context.next = 23;
                                            return dataUtil.gameinfo();

                                        case 23:
                                            gameinfo = _context.sent;

                                            console.log('gameinfo => ', gameinfo);

                                            // 10 投币
                                            _context.next = 27;
                                            return dataUtil.putdowncoin();

                                        case 27:
                                            putdowncoindata = _context.sent;

                                            console.log('putdowncoindata => ', putdowncoindata);

                                            // 11道具使用
                                            _context.next = 31;
                                            return dataUtil.propuse({
                                                prop_id: "100"
                                            });

                                        case 31:
                                            propuse_data = _context.sent;

                                            console.log('11道具使用 => ', propuse_data);

                                        case 33:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        }));

                        return function bindUser(_x) {
                            return _ref2.apply(this, arguments);
                        };
                    }();

                case 19:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, undefined);
}))();