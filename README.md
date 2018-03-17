# 斗鱼TV
## v1.0
## 调用的斗鱼公开API和网上搜集到的API
## 技术盏: react + react-router v4 + fetch + css modules + flex + localStorage
## 图标用的 fontawesome
## 个人练习项目，仅供参考

## clone

```
git clone git@github.com:jiadahao/react-douyu.git
```
## run
```
npm install
npm start 
```

## 存在问题
1. 因使用了两个不同域下的 API ，返回数据格式存在偏差，增加了组件冗余代码。
2. 返回数据没有分页详细内容，利用已有API只能进行假分页，暂未分页。
3. 未能解决直播视频真实地址，暂使用官方视频分享块。

## 后续会整理出精确全面的API，对页面重构，并增加新的技术。