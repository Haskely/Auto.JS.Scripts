本项目为一些 AutoJs 的脚本。如微信抢红包等。

AutoJs 是安卓系统上的自动化工具。它的底层原理是对安卓辅助服务（Android AccessibilityService）提供的API进行封装，使用 JavaScript 语言进行控制。AutoJs 最初由 [hyb1996](https://github.com/hyb1996/Auto.js) 开发，然而自 2019 年就不再维护，原项目 Releases 也被删除，转而闭源开发收费版本 [AutoJs Pro](https://g.pro.autojs.org/)，然而 AutoJs Pro 出于法律法规等因素屏蔽了微信、淘宝、支付宝等常见 APP 内的自动化控制，不符合很多人的需求。因此也有一些开发者 Fork 了原项目单独开发维护，目前自己能找到维护相对活跃的有：

1. [kkevsekk1/AutoX](https://github.com/kkevsekk1/AutoX)
2. [TonyJiangWJ/Auto.js](https://github.com/TonyJiangWJ/Auto.js)

这些项目至今或加入了很多新功能，如文字 OCR，或进行了些许魔改，比如修改包名避免检测等。同时也提供了软件的直接下载方式，无需自己编译。

本项目的用法为，下载安装上述某一个 AutoJs APP，把本项目“主程序”文件夹复制到 AutoJs APP 生成的脚本文件夹下，APP内直接运行。