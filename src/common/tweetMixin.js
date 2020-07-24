//关于动态列表 对于单个动态操作的 混入对象
import Toast from 'components/vant/toast/toast';
//这里引入了 Toast 方法，请一定在页面 template 中 使用van-toast组件
export default {
    methods:{
         //收藏某个 动态
      collectTap(id) {
        console.log(id, 'collect');
        Toast('收藏成功');
      },
      starTap(id) {
        console.log(id, 'star');
        Toast('点赞成功');
      },
      //点击 动态的更多信息评论
      seeMore(id) {
        console.log(id);
        this.$navigate('/pages/tweet_detail?id=' + id);
      },
      //点击用户头像 查看用户信息
      seeUserInfo(id) {
        console.log('userid', id);
        this.$navigate('/pages/userinfo?id=' + id);
      },
    }
}