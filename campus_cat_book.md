## campus_cat_book 项目总结

技术栈：

前端：wepy框架+vant 组件库 [github仓库](https://github.com/Galileo01/campus_cat_book)

后端：node/express ，mongodb  [github仓库](https://github.com/Galileo01/campus_cat_book_backend)

通过wepy 可以使用类似于 Vue的语法书写代码

### 1.初始化wepy

按照wepy 官网的[教程](https://wepyjs.github.io/wepy-docs/2.x/#/base/getstart) 安装wepy-cli，使用模板创建一个wepy项目 ，

- 删除一些没有必要的文件
- 按照自己之前写Vue的文件结构，参照 官网的 [配置文件讲解](https://wepyjs.github.io/wepy-docs/2.x/#/cli/config) 重新构建文件结构
- 随便写一些代码，测试能否正常运行
- 浏览文档，常识编写简单页面

### 2.选择组件库

参照[文章](https://www.ifanr.com/minapp/1196588) 选择了vant 组件库，

- vant的组件在浏览器可以直接预览，不需要打开微信小程序
- 比较喜欢vant 总体偏蓝的风格，主色调和element 差不多
- 也和iview对比例一下 引入组件的方式，vant 的比较方便
- 查看官方文档，各个组件，

### 3.开始设计功能和页面

- 编写功能介绍md

  本来打算画一个脑图的

- 使用墨刀 在线设计小程序的界面和各个页面的跳转

### 4.项目配置

- 引入vant 组件库

  npm install 

  安装完依赖后，把 **node_modules/_@vant_weapp/lib** 的内容拷贝到 src/components/vant（或者先拷贝lib文件夹再改名）

  本项目中组件的引用方式都是 **components/vant/xxx**

  

- wepy.config.js的配置
  
  1. 路径别名

```js
 alias: {
      '@': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets'),
      'common':path.resolve(__dirname, 'src/common'),
      'network':path.resolve(__dirname, 'src/network'),
      'components':path.resolve(__dirname, 'src/components'),
    },
```

2. 静态资源位置

   ```js
   static: ['src/assets'],
   ```

### 5.项目优化

1. 合并setData








### 6. 项目经验



1. 在wepy 框架内，**依然可以使用 原生的语法**

   - 在html 结构中 

     比如 使用 value="{{xxx}}"等

   - 在方法或生命周期函数中

     依然可以使用**wx.xxx访问全局Api**

     而  vm.$wx  指向 原生this   ，过 `this.$wx.setData`访问到`setData`

   

2. wepy 和 原生的 model:xxx="aaa" 双向数据绑定并不兼容

   当在 wepy html 结构中，使用  **model:xxx="aaa"** 指令，视图层 可以做到 双向绑定，但是 模型层的 data 并没有更新，

   对于 input 表单而言，需要自己 绑定 change/input 事件，动态的 更改 data 状态

3. **this.$navigate** 跳转页面

4.  在2.0 之后 wepy.request 被废弃，需要开发者自己封装 网络请求

   以下是我基于wx.request 封装的 http 类

   ```js
   //封装 网络请求的 基础方法
   class http {
       constructor({ baseURL, timeout }) {
           this._header = {
               'content-type': 'application/json'
           }
           this.baseURL = baseURL || '';
           this.timeout = timeout || 500;//超时时间 默认500ms
       }
       get(url, data, header) {
           return this.request(url, data, header, 'GET')
       }
       delete(url, data, header) {
           return this.request(url, data, header, 'DELETE')
       }
       put(url, data, header) {
           return this.request(url, data, header, 'PUT')
       }
       post(url, data, header) {
           return this.request(url, data, header, 'POST')
       }
       request(url, data, header, method) {
           return new Promise((resolve, reject) => {
               wx.request({
                   url: this.baseURL + url,
                   data: data,
                   header: header || this._header,
                   method: method,
                   success: (res => {
                       if (res.statusCode === 200) {
                           //200: 服务端业务处理正常结束
                           resolve({
                               data: res.data.data
                           })
                       } else {
                           wx.showToast({
                               title: '请求失败',
                               icon: 'none'
                           })
                           reject(res);
   
                       }
                   }),
                   fail: (res => {
                       wx.showToast({
                           title: '请求失败',
                           icon: 'none'
                       })
                       reject(res)
                   })
               })
           })
       }
   }
   
   export default http
   
   ```

   5. 由于小程序自身限制 **无法在wxml 渲染时 {{}}内不能直接调用逻辑层的方法**
   
      定义在methods 里的方法不能在 wxml 中通过{{}}直接调用，  只能转为**computed** ，或者使用[**wxs** ](https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html)
   使用wxs 减少通信的次数，**让事件在视图层（Webview）响应**  
   
      
   
   6. 微信内的图片上传
   
      由于原生微信的限制，
   
      - 原生不支持 formData Api 
   
        不能通过手动new formData  来提交 content-type` 为 `multipart/form-data 类型的请求，一种常用的业务场景就是文件提交
   
      - wx.uploadFile（）  一次只支持上传一个媒体文件
   
        这就需要后台编写 继续上传的 接口，接收剩下的 文件
   
   7. 小程序的 请求域名配置
   
      ![image-20200913150230486](campus_cat_book.assets/image-20200913150230486.png)
   
      ​     需要注意的是：不支持ip，
   
      ​	在实际开发中，我的后台 部署在http 服务的8080端口上，除非关闭 域名的交延，否则无法正常的 使用，这时就需要 **将express 升级到http**
   
        更多资料
   
      [1.node 文档](http://nodejs.cn/api/https.html#https_https_createserver_options_requestlistener)
   
      [2 博文](https://blog.csdn.net/weixin_34414650/article/details/91385830)
   
      后台 项目app.js
   
      ```js
      const fs=require('fs')
      const https=require('https')
      const express = require('express')
      const mongodbUtils = require('./commonjs/mongodbUtils');
      const router = require('./router/index')
      const app = express();
      
      const options={
          key:fs.readFileSync('./certificate/markjoe.xyz.key'),
          cert:fs.readFileSync('./certificate/markjoe.xyz.crt')
      };
      
      //使用证书和 密钥文件 创建 https 服务
      const server=https.createServer(options,app);
      app.use(express.json())
      app.use(express.urlencoded({ extended: true }))
      
      //连接数据库
      mongodbUtils.connect();
      
      //挂载路由
      app.use('/public',express.static('public'));
      app.use(router)
      
      // app.listen(8080, () => {
      //     console.log('server is running at 8080');
      // });
      
      
      
      server.listen(8080, () => {
          console.log('server is running at 8080');
      });
      ```
   
      