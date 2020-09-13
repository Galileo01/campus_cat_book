import httpIns from './index'

//提交 评分
export function grade(number) {
    return httpIns.post('/score/make', {
        number,
        isAnonymous: !Boolean(wx.getStorageSync('nickName'))
    })

} 