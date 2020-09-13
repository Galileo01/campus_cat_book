import httpIns from './index'
import { uploader } from 'common/utils'
import http from './http';
//获取动态
export function getTweets(offset, limit) {
    return httpIns.get('/tweet/getAll', { offset, limit })
}

//创建 动态
// 基于 wx.uploadFile 封装 ，，只携带一张图片
export async function create(info) {
    const { text, video, imgs, topics } = info;
    console.log(JSON.stringify(topics));
    //创建包含视频的 动态
    if (video) {
        try {
            const res = await uploader({
                url: httpIns.baseURL + '/tweet/create',
                filePath: video,
                name: 'video',
                formData: {
                    user: wx.getStorageSync('nickName'),
                    text: text,
                    topics: JSON.stringify(topics),//转换为 字符串 传输
                },
            });
            console.log(res);
            return res.substring(res.indexOf(':') + 2, res.indexOf('}') - 1);
        }
        catch (err) {
            return { msg: err + '' }
        }

    }
    //创建 包含  多张图片的 动态
    else if (imgs) {
        //存在imgs 多张图片
        let tweetId;
        let data;
        //上传 第一张 图片
        const res = await uploader({
            url: httpIns.baseURL + '/tweet/create',
            filePath: imgs[0],
            name: 'img',
            formData: {
                user: wx.getStorageSync('nickName'),
                text: text,
                topics: JSON.stringify(topics)
            }
        })
        console.log(res);
        //uploadFile 不知道怎么处理的 响应数据，返回的是一个字符
        tweetId = res.substring(res.indexOf(':') + 2, res.indexOf('}') - 1);
        //循环 上传剩下的 图片
        if (tweetId && imgs.length > 1) {
            for (let i = 1; i < imgs.length; i++) {
                const res = await uploader({
                    url: httpIns.baseURL + '/tweet/createContinue',
                    filePath: imgs[i],
                    name: 'img',
                    formData: {
                        tweetId
                    }
                });
                data = res.substring(res.indexOf(':') + 2, res.indexOf('}') - 1);
                if (res.includes('msg')) { //包含msg 
                    return Promise.reject(new Error(data))//使用new Error 获取
                }
                if (i === imgs.length - 1) {
                    console.log('退出');
                    return Promise.resolve({ data })
                }
            }

        }
        else return Promise.resolve({ data: tweetId })
    }
    //创建 纯文本动态
    else {
        return httpIns.post('/tweet/createContinue', {
            user: wx.getStorageSync('nickName'),
            text: text,
            topics: JSON.stringify(topics),//转换为 字符串 传输
        })
    }
}

//点赞动态
export function star(_id) {
    return httpIns.post('/tweet/starCount', {
        tweetId: _id
    })
}

//根据id 获取
export function getById(_id) {
    return httpIns.get('/tweet/getById', {
        _id
    })
}

//获取 某个用户创建 的动态
export function getByUser({ name, offset, limit }) {
    return httpIns.get('/tweet/getByUser', {
        name, offset,
        limit
    })
}