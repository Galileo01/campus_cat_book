import httpIns from './index'

//获取当前 用户创建 的  请求
export function getMyApplies() {
    return httpIns.get('/apply/get', {
        user: wx.getStorageSync('nickName')
    })
}

// 用户新建请求
export function create(right) {
    return httpIns.post('/apply/create', {
        user: wx.getStorageSync('nickName'),
        right
    })

}