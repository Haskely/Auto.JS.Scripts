/**
 * 60000002 蚂蚁森林
 * 60000006 附近优惠
 * 60000012 中小学
 * 60000023 蚂蚁保险
 * 60000024 彩票游戏,不对所有用户开放
 * 60000029 口碑排行榜
 * 60000032 添加第一张证件 各类证件齐管理
 * 60000033 in贴纸商城
 * 60000039 超值抢购
 * 60000040 未来酒店
 * 60000044 权益区 无法加载
 * 60000047 校园头条 无法加载,可能缺少参数
 * 60000052 手机通讯录备份 未对所有用户开放
 * 60000057 阿里宝卡
 * 60000071 天天有料
 * 60000076 VIP预约服务 无法加载,可能我不是VIP的原因
 * 60000077 优酷会员首页
 * 60000081 商家服务
 * 60000091 花呗
 * 60000103 支付周奖励金列表页
 * 60000105 我的银行卡 管理页
 * 60000120 福员外 不知道干嘛的
 * 60000125 租房
 * 60000126 余额宝
 * 60000130 淘票票
 * 60000134 外币兑换 服务正在升级
 * 60000135 飞猪汽车票
 * 60000145 阿里巴巴认证中心
 * 60000146 寄快递
 * 60000148 财富号
 * 60000150 我的口碑
 * 60000153 注销账号 注销支付宝账号用的
 * 60000154 AA收款
 * 60000155 共享单车
 * 60000156 支付宝红包~这个应该也是缺少参数
 * 60000160 稳健收益  应该是理财类的东西 
 * 60000161 蚂蚁会员周周乐
 * 60000162 彩虹星愿 应该是教育孩子的
 * 
 */

var a = app.intent({
    action: "VIEW",
    data: "alipayqr://platformapi/startapp?saId=60000002"
});
app.startActivity(a);