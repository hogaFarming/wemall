"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

(function (glo) {
    "use strict";
    //common

    var Docum = document;
    var windowHead = Docum.head;

    var
    //模块处理中 
    PENDING = "pending",

    //模块加载成功
    RESOLVED = "resolved",

    //模块加载失败
    REJECTED = "rejected",

    //js加载完成，但是模块定义未完成
    LOADED = "loaded";

    //映射资源
    var paths = {};

    //映射目录
    var dirpaths = {};

    //载入模块用的map对象
    var dataMap = {};

    //基础数据对象
    var baseResources = {
        paths: paths,
        dirpaths: dirpaths,
        //js模块相对路径
        baseUrl: "",
        dataMap: dataMap,
        //临时挂起的模块对象
        tempM: {}
    };

    //function
    //转换成array类型
    var arrayslice = Array.prototype.slice;
    var makeArray = function makeArray(arrobj) {
        return arrayslice.call(arrobj);
    };

    //获取类型
    var objectToString = Object.prototype.toString;
    var getType = function getType(value) {
        return objectToString.call(value).toLowerCase().replace(/(\[object )|(])/g, '');
    };

    // 判断是否function类型（包括asyncFunction）
    var isFunction = function isFunction(d) {
        return getType(d).indexOf('function') > -1;
    };

    //array类型的遍历
    var arrayEach = function arrayEach(arr, func) {
        !(arr instanceof Array) && (arr = makeArray(arr));
        arr.some(function (e, i) {
            return func(e, i) === false;
        });
        return arr;
    };

    //获取目录名
    var getDir = function getDir(url) {
        var urlArr = url.match(/(.+\/).+/);
        return urlArr && urlArr[1];
    };

    //修正字符串路径
    var removeParentPath = function removeParentPath(url) {
        var urlArr = url.split(/\//g);
        var newArr = [];
        arrayEach(urlArr, function (e) {
            if (e == '..' && newArr.length && newArr.slice(-1)[0] != "..") {
                newArr.pop();
                return;
            }
            newArr.push(e);
        });
        return newArr.join('/');
    };

    //改良异步方法
    var nextTick = function () {
        var isTick = false;
        var nextTickArr = [];
        return function (fun) {
            if (!isTick) {
                isTick = true;
                setTimeout(function () {
                    for (var i = 0; i < nextTickArr.length; i++) {
                        nextTickArr[i]();
                    }
                    nextTickArr = [];
                    isTick = false;
                }, 0);
            }
            nextTickArr.push(fun);
        };
    }();

    //是否空对象
    var isEmptyObj = function isEmptyObj(obj) {
        for (var i in obj) {
            return 0;
        }
        return 1;
    };

    //是否undefined
    var isUndefined = function isUndefined(val) {
        return val === undefined;
    };

    //返回Promise实例
    var promise = function promise(func) {
        return new Promise(func);
    };

    // 拆分参数和真实地址
    var split_drill_param = function split_drill_param(url) {
        var sarr = url.split(" ").filter(function (e) {
            if (e) return e;
        });
        return [sarr[0], sarr.slice(1)];
    };

    //main
    //主业务逻辑
    var R = {
        //加载script的方法
        loadScript: function loadScript(pathOption, res, rej) {
            var url = pathOption.path;
            var script = Docum.createElement('script');

            //判断版本号
            var _drill$cacheInfo = drill.cacheInfo,
                k = _drill$cacheInfo.k,
                v = _drill$cacheInfo.v;

            if (url && k && v) {
                if (url.search(/\?/) > -1) {
                    url += "&" + k + "=" + v;
                } else {
                    url += "?" + k + "=" + v;
                }
            }

            //填充相应数据
            script.type = 'text/javascript';
            script.async = true;
            url && (script.src = url);

            script.onload = res;
            script.onerror = rej;

            //ie10对 async支持差的修正方案
            nextTick(function () {
                windowHead.appendChild(script);
            });

            return script;
        },
        //载入单个资源的代理方法
        agent: function agent(pathOption, groupData) {
            return promise(function (res, rej) {
                var param = pathOption.param,
                    path = pathOption.path;

                var tar = dataMap[path];
                if (tar) {
                    switch (tar.state) {
                        case LOADED:
                        case PENDING:
                            tar.c.push({
                                res: res,
                                groupData: groupData
                            });
                            break;
                        case RESOLVED:
                            nextTick(function () {
                                if (tar.get) {
                                    tar.get(function (data) {
                                        res(data);
                                    }, groupData);
                                } else {
                                    res();
                                }
                            });
                            break;
                        case REJECTED:
                            nextTick(function () {
                                rej();
                            });
                            break;
                    }
                } else {
                    dataMap[path] = tar = {
                        //模块类型
                        // type: "file",
                        state: PENDING,
                        c: [{
                            res: res,
                            rej: rej,
                            groupData: groupData
                        }]
                    };

                    R.loadScript(pathOption, function () {
                        tar.state = LOADED;
                        R.setTemp(pathOption);
                        baseResources.tempM = {};
                    }, function () {
                        while (0 in tar.c) {
                            tar.c.shift().rej('load script error => ' + path);
                        }
                        baseResources.tempM = {};
                        tar.state = REJECTED;
                        delete tar.c;
                    });
                }
            });
        },
        // 设定默认文件类型
        // 默认支持的 普通js文件（file），define模块，task进程
        setTemp: function setTemp(pathOption) {
            var path = pathOption.path;

            //获取模块数据

            var tempM = baseResources.tempM;

            var data = tempM.d;
            var ids = tempM.ids;

            //查看是否有设定ids

            ids && getType(ids) == "string" && (ids = [ids]);

            var tar = dataMap[path];

            //默认模块为普通文件类型
            var type = tar.type = tempM.type || "file";

            //判断是否有自定义id
            if (ids) {
                arrayEach(ids, function (e) {
                    dataMap[e] = tar;
                });
            }

            //运行成功
            var runFunc = function runFunc(d) {
                //响应队列resolve函数
                while (0 in tar.c) {
                    tar.c.shift().res(d);
                }

                //设置返回数据的方法
                tar.get = function (callback) {
                    callback(d);
                };

                //设置完成
                tar.state = RESOLVED;

                //清除无用数据
                delete tar.c;
            };

            //根据类型做不同的处理
            switch (type) {
                //普通文件类型
                case "file":
                    runFunc();
                    break;
                //模块类型
                case "define":
                    //判断是否是函数
                    if (isFunction(data)) {
                        var exports = {},
                            module = {
                            exports: exports
                        };

                        //判断返回值是否promise
                        var p = data(function () {
                            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                                args[_key] = arguments[_key];
                            }

                            return R.require(args, {
                                rel: path
                            });
                        }, exports, module, {
                            FILE: path
                        });

                        if (p instanceof Promise) {
                            p.then(function (d) {
                                if (isUndefined(d) && getType(module.exports) == "object" && !isEmptyObj(module.exports)) {
                                    d = module.exports;
                                }
                                runFunc(d);
                            });
                        } else {
                            //数据类型
                            runFunc(p);
                        }
                    } else {
                        runFunc(data);
                    }
                    break;
                //任务类型
                case "task":
                    runFunc = null;
                    //设定数据值
                    if (isFunction(data)) {
                        var getFun = tar.get = function (res, groupData) {
                            var p = data(function () {
                                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                    args[_key2] = arguments[_key2];
                                }

                                return R.require(args, {
                                    rel: path
                                });
                            }, groupData.pdata, {
                                FILE: path
                            });
                            p.then(function (d) {
                                res(d);
                            });
                        };

                        //响应队列resolve函数
                        while (0 in tar.c) {
                            var _tar$c$shift = tar.c.shift(),
                                res = _tar$c$shift.res,
                                groupData = _tar$c$shift.groupData;

                            getFun(res, groupData);
                        }
                    } else {
                        throw 'task module type error';
                    }

                    //设置完成
                    tar.state = RESOLVED;

                    //清除无用数据
                    delete tar.c;
                    break;
            };
        },
        //转换路径
        fixPath: function fixPath(pathOption, groupData) {
            var param = pathOption.param,
                path = pathOption.path;


            var relatePath = groupData.rel;
            //判断是否已经注册了路径
            if (paths[path]) {
                path = paths[path];
            } else {
                var tarreg = void 0;
                //判断是否注册目录
                for (var i in dirpaths) {
                    tarreg = new RegExp('^' + i);
                    if (tarreg.test(path)) {
                        path = path.replace(tarreg, dirpaths[i]);
                        break;
                    }
                }
            }

            //判断是否带协议头部
            //没有协议
            if (!/^.+?\/\//.test(path)) {
                //是否带参数
                if (!/\?.+$/.test(path) && !/.js$/.test(path)) {
                    //没有js的话加上js后缀
                    path += ".js";
                }

                //判断是否有相对路径字样
                var rePath = path.match(/^\.\/(.+)/);
                if (rePath) {
                    //获取相对目录
                    path = getDir(relatePath) + rePath[1];
                } else {
                    // 判断是否有 -r(root)参数
                    if (param.indexOf('-r') == -1) {
                        //加上根目录
                        path = baseResources.baseUrl + path;
                    }
                }

                //去除相对上级目录
                path = removeParentPath(path);
            }

            // 修正path参数值
            pathOption.path = path;

            return pathOption;
        },
        //根据数组内的路径进行封装返回Promise对象
        toProm: function toProm(args, groupData) {
            var pendFun = void 0;

            var pms = promise(function (res, rej) {
                var arr = [];
                var len = args.length;

                //确认返回数据的方法
                var monitFun = function monitFun() {
                    len--;
                    if (!len) {
                        pendFun = null;
                        if (arr.length == 1) {
                            res(arr[0]);
                        } else {
                            res(arr);
                        };
                    }
                };

                arrayEach(args, function (pathOption, i) {
                    //获取实际路径
                    pathOption = R.fixPath(pathOption, groupData);

                    //获取promise模块
                    var p = R.agent(pathOption, groupData);

                    p.then(function (data) {
                        arr[i] = data;
                        pendFun && pendFun(data, i);
                        monitFun();
                    }).catch(function (err) {
                        rej(err);
                    });
                });
            });

            //加入pend事件
            pms.pend = function (func) {
                pendFun = func;
                return pms;
            };

            return pms;
        },
        //引用模块
        require: function require(args) {
            var groupData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var new_args = [];
            // 拆分args的参数
            arrayEach(args, function (e) {
                var _split_drill_param = split_drill_param(e),
                    _split_drill_param2 = _slicedToArray(_split_drill_param, 2),
                    path = _split_drill_param2[0],
                    param = _split_drill_param2[1];

                new_args.push({
                    path: path,
                    param: param
                });
            });

            var p = R.toProm(new_args, groupData);

            //添加post方法
            p.post = function (data) {
                groupData.pdata = data;
                return p;
            };
            return p;
        },
        //定义模块
        define: function define(d, ids) {
            baseResources.tempM = {
                type: "define",
                d: d,
                ids: ids
            };
        },
        //定义进程
        task: function task(d, ids) {
            baseResources.tempM = {
                type: "task",
                d: d,
                ids: ids
            };
        }
    };

    //主体require
    var require = function require() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return R.require(args);
    };
    var oDefine = function oDefine(d, ids) {
        R.define(d, ids);
    };
    var oTask = function oTask(d, ids) {
        R.task(d, ids);
    };

    var drill = {
        config: function config(data) {
            //配置baseurl
            baseResources.baseUrl = data.baseUrl || baseResources.baseUrl;

            //配置paths
            for (var i in data.paths) {
                if (/\/$/.test(i)) {
                    //属于目录类型
                    dirpaths[i] = data.paths[i];
                } else {
                    //属于资源类型
                    paths[i] = data.paths[i];
                }
            }
        },
        remove: function remove(url) {
            //获取路径
            var _R$fixPath = R.fixPath({ path: url }, {}),
                path = _R$fixPath.path;

            //获取寄存对象


            var tarData = dataMap[path];

            if (tarData) {
                delete dataMap[path];
                //告示删除成功
                return true;
            }
        },
        //扩展函数
        extend: function extend(option) {
            if (isFunction(option)) {
                option(baseResources, R);
            } else {
                var defaults = {
                    // 承接函数的名字
                    name: ""
                };
            }
        },
        require: require,
        define: oDefine,
        task: oTask,
        //缓存版本号
        cacheInfo: {
            k: "srcache"
            //, v: ""
        }
    };

    //init
    // 初始化版本号
    var cScript = Docum.currentScript;
    if (!cScript) {
        cScript = Docum.querySelector(['drill-cache']);
    }
    if (cScript) {
        var cacheVersion = cScript.getAttribute('drill-cache');
        cacheVersion && (drill.cacheInfo.v = cacheVersion);
    }

    // 外部使用的变量
    glo.require || (glo.require = require);
    glo.define || (glo.define = oDefine);
    glo.task || (glo.task = oTask);
    if (glo.drill) {
        if (isFunction(glo.drill)) {
            glo.drill(drill);
        } else {
            throw "async drill.js type error";
        }
    }
    glo.drill = drill;

    window.baseResources = baseResources;
})(window);