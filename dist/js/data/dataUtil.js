"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function stringToHex(str) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
        arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + arr.join("\\u");
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

function randomWord(randomFlag, min, max) {
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (var i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str;
}

var dataUtil = _defineProperty({
    // 根接口域名
    root: "http://api.sc.shouyouhuyu.com",
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'X-ISAPI': 1,
        'Content-Type': "application/json;charset=UTF-8"
    },
    // getData: async(url, options) => {
    //     let defaults = {
    //         method: "GET",
    //         headers: dataUtil.headers
    //     };
    //     Object.assign(defaults, options);
    //     let data = await fetch(url, defaults);
    //     try {
    //         data = await data.json();
    //     } catch (e) {
    //         console.log(e);
    //     }

    //     return data;
    // },
    getData: function getData(url, options) {
        return new Promise(function (res, rej) {
            var defaults = {
                method: "GET",
                headers: dataUtil.headers
                // data:""
            };
            Object.assign(defaults, options);
            var oReq = new XMLHttpRequest();
            oReq.onload = function () {
                res(oReq.response);
            };
            oReq.responseType = "json";
            oReq.open(defaults.method, url + ("?usertest=" + (GetQueryString('usertest') || 69) + "&type=0"));
            for (var i in defaults.headers) {
                oReq.setRequestHeader(i, defaults.headers[i]);
            }
            if (defaults.data) {
                defaults.data = JSON.stringify(defaults.data);
            }
            oReq.send(defaults.data);
        });
    },
    // 保存当前盘的方法
    saveDesk: function saveDesk() {
        var _this = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var gdata;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return dataUtil.gamenowdetail({
                                data: JSON.stringify(pz.getPosition())
                            });

                        case 2:
                            gdata = _context.sent;

                            console.log('上传结果 => ', gdata);

                        case 4:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this);
        }))();
    },

    // 获取初始数据
    // 设置接口初始Authorization
    init: function init() {
        var _this2 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
            var api_token, data;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            api_token = localStorage.getItem('api_token');

                            if (!api_token) {
                                _context2.next = 6;
                                break;
                            }

                            dataUtil.headers['Authorization'] = api_token;
                            console.log('init api_token => ', api_token);
                            _context2.next = 10;
                            break;

                        case 6:
                            _context2.next = 8;
                            return dataUtil.getData(dataUtil.root + '/api/init');

                        case 8:
                            data = _context2.sent;

                            if (data.result) {
                                // 开始添加 header 认证
                                dataUtil.headers['Authorization'] = data.token;
                                localStorage.setItem('api_token', data.token);
                                console.log('init => ', data);
                            } else {
                                console.log('初始数据获取失败');
                            }

                        case 10:
                            if (!/usertest/.test(location.href)) {
                                _context2.next = 12;
                                break;
                            }

                            return _context2.abrupt("return");

                        case 12:
                            _context2.next = 14;
                            return _this2.login();

                        case 14:
                            return _context2.abrupt("return");

                        case 15:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }))();
    },
    login: function login() {
        var _this3 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
            var loginStatus, isAuth, callbackUrl, apiToken, url, res;
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            console.log('本地检查登录状态...');
                            loginStatus = localStorage.getItem('isLogin');

                            if (!(!loginStatus || loginStatus === "0")) {
                                _context3.next = 17;
                                break;
                            }

                            console.log('isLogin => 0');
                            isAuth = localStorage.getItem("isAuth");

                            if (!(isAuth === "1")) {
                                _context3.next = 7;
                                break;
                            }

                            return _context3.abrupt("return");

                        case 7:
                            callbackUrl = location.href;
                            apiToken = localStorage.getItem('api_token');
                            url = dataUtil.root + "/api/wechat/auth" + "?callback=" + encodeURIComponent(callbackUrl) + "&token=" + apiToken + "&type=mp";

                            console.log("跳转微信认证..");
                            console.log("redirect url: " + url);
                            console.log("callback url == " + callbackUrl);
                            localStorage.setItem("isLogin", "2");
                            window.location.href = url;
                            _context3.next = 42;
                            break;

                        case 17:
                            if (!(loginStatus === "2")) {
                                _context3.next = 41;
                                break;
                            }

                            console.log('isLogin => 2');
                            console.log('服务端检查当前登录状态...');
                            _context3.next = 22;
                            return dataUtil.getData(dataUtil.root + '/api/judge/logins');

                        case 22:
                            res = _context3.sent;

                            if (!(res.data.is_auth === 1 && res.data.is_user === 0)) {
                                _context3.next = 29;
                                break;
                            }

                            localStorage.setItem("isLogin", "0");
                            localStorage.setItem("isAuth", "1");
                            // TODO
                            console.log("已通过微信认证，但是未登录？");
                            _context3.next = 39;
                            break;

                        case 29:
                            if (!(res.data.is_auth === 0)) {
                                _context3.next = 38;
                                break;
                            }

                            localStorage.setItem("isAuth", "0");
                            localStorage.setItem("isLogin", "0");
                            console.log('当前未登录。');
                            _context3.next = 35;
                            return _this3.login();

                        case 35:
                            return _context3.abrupt("return", _context3.sent);

                        case 38:
                            if (res.data.is_auth === 1 && res.data.is_user === 1) {
                                localStorage.setItem("isAuth", "1");
                                localStorage.setItem("isLogin", "1");
                                console.log('当前已登录');
                            }

                        case 39:
                            _context3.next = 42;
                            break;

                        case 41:
                            console.log('isLogin => 1');

                        case 42:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this3);
        }))();
    },

    // 获取公匙
    getras: function getras() {
        var _this4 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
            var data;
            return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/sign', {
                                method: "GET"
                            });

                        case 2:
                            data = _context4.sent;

                            if (!data) {
                                _context4.next = 5;
                                break;
                            }

                            return _context4.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context4.stop();
                    }
                }
            }, _callee4, _this4);
        }))();
    },

    // 获取aes
    postaes: function postaes(d) {
        var _this5 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
            var data;
            return regeneratorRuntime.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _context5.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/init_key', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context5.sent;

                            if (!data) {
                                _context5.next = 5;
                                break;
                            }

                            return _context5.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this5);
        }))();
    },

    // 绑定用户
    bindUser: function bindUser(d) {
        var _this6 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
            var data;
            return regeneratorRuntime.wrap(function _callee6$(_context6) {
                while (1) {
                    switch (_context6.prev = _context6.next) {
                        case 0:
                            _context6.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/bind', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context6.sent;
                            return _context6.abrupt("return", data);

                        case 4:
                        case "end":
                            return _context6.stop();
                    }
                }
            }, _callee6, _this6);
        }))();
    },

    // 换硬币
    excoin: function excoin(d) {
        var _this7 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
            var data;
            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            _context7.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/exchangecoin', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context7.sent;

                            if (!data) {
                                _context7.next = 5;
                                break;
                            }

                            return _context7.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context7.stop();
                    }
                }
            }, _callee7, _this7);
        }))();
    },

    // 结果提交
    gameresult: function gameresult(d) {
        var _this8 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
            var data;
            return regeneratorRuntime.wrap(function _callee8$(_context8) {
                while (1) {
                    switch (_context8.prev = _context8.next) {
                        case 0:
                            _context8.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/gameresult', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context8.sent;

                            if (!data) {
                                _context8.next = 5;
                                break;
                            }

                            return _context8.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context8.stop();
                    }
                }
            }, _callee8, _this8);
        }))();
    },

    // 兑换积分或道具
    prizeevent: function prizeevent(d) {
        var _this9 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
            var data;
            return regeneratorRuntime.wrap(function _callee9$(_context9) {
                while (1) {
                    switch (_context9.prev = _context9.next) {
                        case 0:
                            _context9.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/prizeevent', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context9.sent;

                            if (!data) {
                                _context9.next = 5;
                                break;
                            }

                            return _context9.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context9.stop();
                    }
                }
            }, _callee9, _this9);
        }))();
    },

    // 用户游戏资产信息
    gameinfo: function gameinfo() {
        var _this10 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
            var data;
            return regeneratorRuntime.wrap(function _callee10$(_context10) {
                while (1) {
                    switch (_context10.prev = _context10.next) {
                        case 0:
                            _context10.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/gameinfo', {
                                method: "GET"
                            });

                        case 2:
                            data = _context10.sent;

                            if (!data) {
                                _context10.next = 5;
                                break;
                            }

                            return _context10.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context10.stop();
                    }
                }
            }, _callee10, _this10);
        }))();
    },

    // 放下硬币
    putdowncoin: function putdowncoin() {
        var _this11 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
            var data;
            return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                    switch (_context11.prev = _context11.next) {
                        case 0:
                            _context11.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/putdowncoin', {
                                method: "GET"
                            });

                        case 2:
                            data = _context11.sent;

                            if (!data) {
                                _context11.next = 5;
                                break;
                            }

                            return _context11.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context11.stop();
                    }
                }
            }, _callee11, _this11);
        }))();
    },

    // 道具使用
    propuse: function propuse(d) {
        var _this12 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
            var data;
            return regeneratorRuntime.wrap(function _callee12$(_context12) {
                while (1) {
                    switch (_context12.prev = _context12.next) {
                        case 0:
                            _context12.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/propuse', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context12.sent;

                            if (!data) {
                                _context12.next = 5;
                                break;
                            }

                            return _context12.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context12.stop();
                    }
                }
            }, _callee12, _this12);
        }))();
    },

    // 游戏当前状态收集
    gamenowdetail: function gamenowdetail(d) {
        var _this13 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
            var data;
            return regeneratorRuntime.wrap(function _callee13$(_context13) {
                while (1) {
                    switch (_context13.prev = _context13.next) {
                        case 0:
                            _context13.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/gamenowdetail', {
                                method: "POST",
                                data: d
                            });

                        case 2:
                            data = _context13.sent;

                            if (!data) {
                                _context13.next = 5;
                                break;
                            }

                            return _context13.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context13.stop();
                    }
                }
            }, _callee13, _this13);
        }))();
    },

    // 获取基础配置
    gameconfig: function gameconfig() {
        var _this14 = this;

        return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
            var data;
            return regeneratorRuntime.wrap(function _callee14$(_context14) {
                while (1) {
                    switch (_context14.prev = _context14.next) {
                        case 0:
                            _context14.next = 2;
                            return dataUtil.getData(dataUtil.root + '/api/gameconfig', {
                                method: "GET"
                            });

                        case 2:
                            data = _context14.sent;

                            if (!data) {
                                _context14.next = 5;
                                break;
                            }

                            return _context14.abrupt("return", data);

                        case 5:
                        case "end":
                            return _context14.stop();
                    }
                }
            }, _callee14, _this14);
        }))();
    }
}, "gamenowdetail", function gamenowdetail(d) {
    var _this15 = this;

    return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {
        var data;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
            while (1) {
                switch (_context15.prev = _context15.next) {
                    case 0:
                        _context15.next = 2;
                        return dataUtil.getData(dataUtil.root + '/api/gamenowdetail', {
                            method: "POST",
                            data: d
                        });

                    case 2:
                        data = _context15.sent;

                        if (!data) {
                            _context15.next = 5;
                            break;
                        }

                        return _context15.abrupt("return", data);

                    case 5:
                    case "end":
                        return _context15.stop();
                }
            }
        }, _callee15, _this15);
    }))();
});