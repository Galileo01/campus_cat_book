import httpIns from './index'

//获取所有猫猫
export function getAllCats() {
    return httpIns.get('/cat/get')
}

//搜索猫猫， name 参数进行  正则表达式的 匹配   
export function searchByName(name) {
    return httpIns.get('/cat/get', { name })
}


//根据id 获取 猫猫数据
export function getById(_id) {
    return httpIns.get('/cat/getById', { _id })
}

