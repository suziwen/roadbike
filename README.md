# xiaoshujiang.com 

该源码为小书匠官网( http://soft.xiaoshujiang.com )静态博客生成源码。 使用开源的静态博客生成工具 [gatsby](https://www.gatsbyjs.org) 生成，同时添加了小书匠导出的 zip
文件做为数据源的插件。

目前源代码放在 github 和 gitee 两个平台上， github 适合外网用户访问， gitee 适合国内这边的访问。

- github
   源代码仓库: https://github.com/suziwen/roadbike
- gitee (不更新了,自己到 github 上抓取)
   源代码仓库: https://gitee.com/suziwen/roadbike

部署后的效果: https://suziwen.github.io


# 本地运行


node > 12.22.*
gatsby  > 2.3.*
git

可以考虑使用 nvm 管理不同版本的 node
https://github.com/nvm-sh/nvm

```
git clone https://github.com/suziwen/roadbike
nvm use 12.16.1
npm  install
npm run build
npm run start
```
访问 http://localhost:8000

注： 这里需要先把 gatsby-transformer-xsjzip 编译一下，生成相关的 js 文件，才能在根目录下正常执行其他操作

# github action

在 `.github` 目录下，有自动运行的 `action`, 可以自己修改成适合自己的仓库信息，这样以后 github 仓库有变化时，就自动编译

# 添加文章

1. 通过小书匠编辑器 http://markdown.xiaoshujiang.com 的导出功能，将文章导出为 zip 格式
2. 将该 zip 文件放置到 `src/xsjposts/blogs` 目录下
3. 执行 `npm run build`
4. 编译后，再执行 `npm run develop`
5. 访问 http://localhost:8000/blog , 就可以在列表里查看到刚添加的文章了。

# 打包发布

```
npm run deploy
```

注： 

1. 需要自己在 `package.json` 里，把对应的服务器地址调整一下。
2. 如果发布在非根路径的网站上，比如 `roadbike`，需要在 `gatsby-config.js` 里添加 `pathPrefix: "/roadbike",` 属性
3. 在 package.json 的打包脚本里带上 `--prefix-paths` 参数




# License

MIT
