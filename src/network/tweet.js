import httpIns from './index'

//获取动态
export function getTweets(offset,limit){
    return httpIns.get('/tweet/getAll',{offset,limit})
}

//创建 动态
export function create(formData) {
    return httpIns.post('/tweet/create',formData,{
        'content-type': 'multipart/form-data'
    })
}


//点赞动态
export function star(_id){
        return httpIns.post('/tweet/starCount',{
            tweetId:_id
        })
}

//根据id 获取
export function getById(_id)
{
    return httpIns.get('/tweet/getById',{
        _id
    })
}