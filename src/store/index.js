import { login } from 'network/user';
//手动编写一个
const store = {
  userinfo: {},
  //自动刷新 用户信息
  async infoRefresh() {
    const nickName = wx.getStorageSync('nickName');//刷新信息的情况下，保证本地存储包含nickName
    const res = await login({ nickName });
    if (!res.data) {
      wx.showToast({
        title: '用户信息刷新失败',
        icon: 'none'
      })
      return Promise.reject('failed')
    }
    this.userinfo = res.data;
    console.log(res.data);
    return Promise.resolve('success')
  }
}

export default store;