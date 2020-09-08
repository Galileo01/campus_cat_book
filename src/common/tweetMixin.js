import { star } from 'network/tweet'
import { collectTweet, cancelCollectTweet } from 'network/user'

//关于动态列表 对于单个动态操作的 混入对象
export default {
  methods: {
    //收藏某个 动态
    async collectTap() {

      if (!this.isCollected) {
        const res = await collectTweet(this.item._id)
        if (res.data) {
          wx.showToast({
            title: '收藏成功',
            icon: 'none'
          })
          this.item.collectCount++;
          this.isCollected = true;
        }
        else wx.showToast({
          title: '收藏失败',
          icon: 'none'
        })
      }
      else {
        const self = this;
        wx.showModal({
          title: '提示',
          content: '即将取消收藏是否继续？',
          async success(res) {
            if (res.confirm) {
              const res = await cancelCollectTweet(self.item._id);
              if (!res.data) {
                wx.showToast({
                  title: '操作失败',
                  icon: 'none'
                })
              }
              wx.showToast({
                title: '操作成功',
                icon: 'none'
              })
              self.item.collectCount--;
              self.isCollected = false;
            } 
          }
        })

      }

    },
    async starTap() {
      const res = await star(this.item._id);
      if (res.data) {
        wx.showToast({
          title: '点赞成功',
          icon: 'none'
        });
        this.item.starCount++;
      }
      else wx.showToast({
        title: '点赞失败',
        icon: 'none'
      })

    },
    //点击 动态的更多信息评论
    seeMore() {
      //组件内 this 没有$navigate 方法，不提供页面跳转的能力
      wx.navigateTo({
        url: '/pages/tweet_detail?id=' + this.item._id
      });
    },
    //点击用户头像 查看用户信息
    seeUserInfo() {

      wx.navigateTo({
        url: '/pages/userinfo?id=' + this.item.userinfo._id
      });
    },
  },
}