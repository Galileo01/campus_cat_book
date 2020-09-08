import httpIns from './index'

//根据id 获取某个动态的 所有评论
export function getByTweetId(tweetId) {
    return httpIns.get('/comment/getBytweetId', { tweetId })
}

//创建评论
export function createComment(info) {
    return httpIns.post('/comment/create', {
        ...info,
        user:wx.getStorageSync('nickName')
    })

}

//点赞评论
export function starComment(id)
{
    return httpIns.post('/comment/star',{commentId:id})
}