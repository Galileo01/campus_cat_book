// 节流throttle代码（定时器）：
export function throttlen(func, delay) {
    var timer = null;
    return function () {
        var context = this;
        var args = arguments;
        if (!timer) {
            timer = setTimeout(function () {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}

//获取服务器静态 资源路径
export function getStaticUrl(router, filename) {
    //数据库存储的是 url 直接引用
    if (filename.startsWith('http'))
        return filename;
    const baseUrl = wx.getStorageSync('baseURL');
    const paths = {
        user: '/user/avatar/',
        cat: '/cat/imgs/',
        tweet: '/tweet/media/',
        bug: '/bug/imgs/'
    }
    return baseUrl + '/public' + paths[router] + filename;
}


// 格式化时间戳
export function formatDate(str, fmt) {

    function padLeftZero(str) {
        return ('00' + str).substr(str.length);
    }
    const date = new Date(str);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            );
        }
    }
    return fmt;
}