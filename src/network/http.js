//封装 网络请求的 基础方法
class http {
    constructor({ baseURL, timeout }) {
        this._header = {
            'content-type': 'application/json'
        }
        this.baseURL = baseURL || '';
        this.timeout = timeout || 500;//超时时间 默认500ms
    }
    get(url, data, header) {
        return this.request(url, data, header, 'GET')
    }
    delete(url, data, header) {
        return this.request(url, data, header, 'DELETE')
    }
    put(url, data, header) {
        return this.request(url, data, header, 'PUT')
    }
    post(url, data, header) {
        return this.request(url, data, header, 'POST')
    }
    request(url, data, header, method) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: this.baseURL + url,
                data: data,
                header: header || this._header,
                method: method,
                timeout: this.timeout,
                success: (res => {
                    if (res.statusCode === 200) {
                        //200: 服务端业务处理正常结束
                     
                        resolve({
                            data: res.data.data,
                            msg: res.data.msg
                        })
                    } else if (res.statusCode === 400) {
                        wx.showToast({
                            title: '请求失败，请检查参数',
                            icon: 'none'
                        })
                        reject(res);

                    }
                    else {
                        wx.showToast({
                            title: '请求失败，服务器出错',
                            icon: 'none'
                        })
                        reject(res);
                    }
                }),
                fail: (res => {
                    wx.showToast({
                        title: '请求失败，请检查网络',
                        icon: 'none'
                    })
                    reject(res)
                })
            })
        })
    }
}

export default http
