let http_api_token = "";

interface HttpOptions {
    method?: "post" | "get";
    data?: Object;
    params?: Object;
    headers?: Object;
}

class Http {
    static URL_BASE = "http://api.sc.shouyouhuyu.com";
    static DEFAULT_HTTP_OPTIONS: HttpOptions = {
        method: "get"
    };
    static DEFAULT_HTTP_HEADERS = {
        "Content-Type": "application/x-www-form-urlencoded"
    };

    public async getApiToken() {
        if (http_api_token) return http_api_token;
        try {
            const result = await this._request("/api/init");
            http_api_token = result.token;
            console.log("http_api_token: " + http_api_token);
            return http_api_token;
        } catch (e) {
            
        }
    }

    public async get(url: string, options: HttpOptions = {}): Promise<any> {
        return this._request(url, utils.extends({}, { method: "get" }, options));
    }

    public async post(url: string, options: HttpOptions = {}): Promise<any> {
        return this._request(url, utils.extends({}, { method: "post" }, options));
    }

    private async _request(url: string, options: HttpOptions = {}): Promise<any> {
        let opts: HttpOptions = utils.extends({}, Http.DEFAULT_HTTP_OPTIONS, options);
        let headers = utils.extends({}, Http.DEFAULT_HTTP_HEADERS, opts.headers || {});
        if (url === "/api/init") {

        } else {
            headers.Authorization = await this.getApiToken();
            headers["X-ISAPI"] = 1;
        }
        return new Promise((resolve, reject) => {
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            let _params = opts.params;
            if (user_test) {
                _params = utils.extends({}, _params, { usertest: user_test });
            }
            let _url = utils.url.paramUrl(Http.URL_BASE + url, _params);
            let method = opts.method === "get" ? egret.HttpMethod.GET : egret.HttpMethod.POST;
            request.open(_url, method);

            Object.keys(headers).forEach(key => {
                request.setRequestHeader(key, headers[key]);
            });

            if (opts.data) {
                // let _data = [];
                // Object.keys(opts.data).forEach(key => {
                //     _data.push(key + "=" + opts.data[key]);
                // });
                // let strData = _data.join("&");
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(opts.data));
            } else {
                request.send();
            }
            
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                try {
                    let req = <egret.HttpRequest>event.currentTarget;
                    let res = JSON.parse(req.response);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, (event: egret.IOErrorEvent) => {
                console.log("http get error", event);
                try {
                    let req = <egret.HttpRequest>event.currentTarget;
                    let res = JSON.parse(req.response);
                    if (res.error_code === "NO LOGIN") {
                        utils.cache.set("isLogin", 0);
                        utils.cache.set("isAuth", 0);
                        platform.login();
                    }
                } catch (e) {
                    console.error(event);
                }
                reject(event);
            }, this);
        });
    }
}

const http = new Http();
