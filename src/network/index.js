import http from './http';
const baseURL='http://127.0.0.1:8080';
wx.setStorage({
    key:'baseURL',
    data:baseURL,
})
const httpIns=new http({
    baseURL
})


//导出 请求实例
export default httpIns;



