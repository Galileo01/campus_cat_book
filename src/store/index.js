import { login } from 'network/user';
import { getStaticUrl } from 'common/utils';
//手动编写一个
const store = {
  userinfo: {},
  //自动刷新 用户信息
  async infoRefresh() {
    const nickName = wx.getStorageSync('nickName');//刷新信息的情况下，保证本地存储包含nickName
    const { data } = await login({ nickName });
    if (!data) {
      wx.showToast({
        title: '用户信息刷新失败',
        icon: 'none'
      })
      return Promise.reject(new Error('refresh failed'))
    }

    //处理当前用户的头像 为可直接使用的 url
    if (!data.avatar)
      data.avatar =
        'https://ftp.bmp.ovh/imgs/2020/07/992030ed118de088.png';
    else data.avatar = getStaticUrl('user', data.avatar);
    this.userinfo = data;
    console.log(data);
    wx.setStorage({
      key: 'isLogined',
      data: true,
    });
    return Promise.resolve(this.userinfo)
  }
}

export default store;