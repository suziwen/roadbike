# 生成静态文件

1. 需要在 node 12.16.1 版本下生成
```
nvm use 12.16.1
```
2. `npm run build`
3. `npm run sync`

# debug on build process

```
node --inspect-brk --no-lazy node_modules/gatsby/dist/bin/gatsby build
```

# 本地运行

```
nvm use 12.16.1
npm run develop
```
