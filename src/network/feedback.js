import httpIns from './index'
import { uploader } from 'common/utils'
//获取自己 提交的反馈

export function getMyFeedbacks() {
    return httpIns.get('/feedback/get', {
        user: wx.getStorageSync('nickName')
    })
}


//提交一个 反馈

export async function create(formData) {
    const imgs = formData.imgs;
    let data;
    //先进行创建申请
    const res = await uploader({
        url: httpIns.baseURL + '/feedback/create',
        filePath: imgs[0],
        name: 'img',
        formData: {
            ...formData,
            user: wx.getStorageSync('nickName')
        }
    })
    const feedbackId = res.substring(res.indexOf(':') + 2, res.indexOf('}') - 1);
    //继续上传剩下的 图片
    if (imgs.length > 1) {
        for (let i = 1; i < imgs.length; i++) {
            const res = await uploader({
                url: httpIns.baseURL + '/feedback/continueUpload',
                filePath: imgs[i],
                name: 'img',
                formData: {
                    feedbackId
                }
            });
            const data = data = res.substring(res.indexOf(':') + 2, res.indexOf('}') - 1);
            if (res.includes('msg')) { //包含msg 
                return Promise.reject(new Error(data))//使用new Error 获取
            }
            if (i === imgs.length - 1) {
                console.log('退出');
                return Promise.resolve({ data })
            }
        }
    }
    else return Promise.resolve({ data: feedbackId })
}

//根据id 获取
export function getById(_id) {
    return httpIns.get('/feedback/get', {
        _id,
    })
        .then(res => {
            return { data: res.data[0] }
        })
}