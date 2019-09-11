# 生成静态文件

1. 需要在 node 8.9.1 版本下生成
```
nvm use 8.9.1
```
2. `npm run build`
3. `npm run sync`

# debug on build process

```
node --inspect-brk --no-lazy node_modules/gatsby/dist/bin/gatsby build
```
