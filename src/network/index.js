import http from './http';
const baseURL = 'https://127.0.0.1:8080';//本地测试
// const baseURL1 = 'https://121.41.225.12:8080';//服务器 ip，
const baseURL1 = 'https://markjoe.xyz:8080'; //服务器 域名
wx.setStorage({
    key: 'baseURL',
    data: baseURL1,
})
const httpIns = new http({
    baseURL:baseURL1
})


//导出 请求实例
export default httpIns;



