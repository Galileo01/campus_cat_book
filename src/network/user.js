import httpIns from './index'
import { uploader } from 'common/utils';//引入 上传器
//用户登录
export function login(userinfo) {
    return httpIns.post('/user/login', userinfo)
}

//获取用户信息
export function getInfo(_id) {
    let params = _id ? { _id } : { name: wx.getStorageSync('nickName') };//优先使用id 获取其他用户的信息
    return httpIns.get('/user/getInfo', params)
}

//注意 preName 参数
export function updateInfo(userinfo) {
    return httpIns.post('/user/updateInfo', userinfo)
}

//更新用户头像  测试
export async function updateAvatar(filePath) {
    // return httpIns.post('/user/updateAvatar', formData)
    const res = await uploader({
        url: httpIns.baseURL + '/user/updateAvatar',
        filePath,
        name: 'avatar',
        formData: {
            name: wx.getStorageSync('nickName')
        }
    })
    return res.substring(res.indexOf(':') + 2, res.indexOf('}') - 1);
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
export function getColectedCats(_id) {
    let params = _id ? { _id } : { name: wx.getStorageSync('nickName') };//优先使用id 获取其他用户的信息
    return httpIns.get('/user/getCats_co', {
        ...params,

    })
}

//获取收藏的动态
export function getColectedTweets(_id) {
    let params = _id ? { _id } : { name: wx.getStorageSync('nickName') };//优先使用id 获取其他用户的信息
    return httpIns.get('/user/getTweets_co', {
        ...params

    })
}


//获取由 用户收藏猫猫生成的 话题列表
export function getUserTopics() {
    return httpIns.get('/user/getMyTopics', { user: wx.getStorageSync('nickName') })
}
