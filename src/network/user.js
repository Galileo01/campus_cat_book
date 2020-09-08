import httpIns from './index'

//用户登录
export function login(userinfo) {
    return httpIns.post('/user/login', userinfo)
}

//获取用户信息
export function getInfo() {
    return httpIns.get('/user/getInfo', {
        name: wx.getStorageSync('nickName')
    })
}

//注意 preName 参数
export function updateInfo(userinfo) {
    return httpIns.post('/user/updateInfo', userinfo)
}

//更新用户头像  测试
export function updateAvatar(formData) {
    return httpIns.post('/user/updateAvatar', formData)
}


//收藏猫猫
export function collectCat(catId) {
    return httpIns.post('/user/collectCat', { name: wx.getStorageSync('nickName'), catId })
}

export function cancelCollectCat(catId) {
    return httpIns.post('/user/cancelCollectCat', { name: wx.getStorageSync('nickName'), catId })
}


//收藏动态
export function collectTweet(tweetId) {
    return httpIns.post('/user/collectTweet', { name: wx.getStorageSync('nickName'), tweetId })
}

export function cancelCollectTweet(tweetId) {
    return httpIns.post('/user/cancelCollectTweet', { name: wx.getStorageSync('nickName'), tweetId })
}


//获取收藏的 猫猫列表
export function getColectedCats(offset, limit ) {
    return httpIns.get('/user/getCats_co', {
        name: wx.getStorageSync('nickName'),
        offset, limit
    })
}

//获取收藏的动态
export function getColectedTweets(offset, limit ) {
    return httpIns.get('/user/getTweets_co', {
        name: wx.getStorageSync('nickName'),
        offset, limit
    })
}
