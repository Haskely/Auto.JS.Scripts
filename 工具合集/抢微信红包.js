Attention = require('./Common/AttentionFloatyWindow.js');
Control = require('./Common/ControlFloatyWindow.js');

const _GlobalVar = {};

_GlobalVar.dc = ['-', '\\', '|', '/'];
_GlobalVar.di = 0;
const _getDynamicChar = () => {
    _GlobalVar.di += 1;
    if (_GlobalVar.di >= 4) _GlobalVar.di = 0;
    return _GlobalVar.dc[_GlobalVar.di];
};

// _GlobalVar.attentionUiObject = null;
const setAttention = (uiObj, text) => {
    let [x, y, w, h] = [0, 0, 0, 0];
    if (uiObj != null) {
        rect = uiObj.bounds();
        [x, y, w, h] = [rect.left, rect.top, rect.width(), rect.height()];
    };
    Attention.setAttentionArea(x, y, w, h, _getDynamicChar() + '>' + text, 0.5);
};


/**
 * 若在聊天界面找到"微信红包"文本控件，需要进一步判断它是不是真正的红包，排除是正常聊天的可能性
 * @param {uiobject} hbtext "微信红包"文本控件
 * @returns 红包控件
 */
const gethongbaoobj = (hbtext) => {
    if (hbtext.clickable()) return null;
    const relat_obj = hbtext.parent();
    if (relat_obj == null) return null;
    // if (relat_obj.childCount() != 2) return null;
    let _target = relat_obj;
    while (!!_target && _target.depth() > 4) {
        if (_target.clickable() && _target.className() == "android.widget.FrameLayout") return _target;
        _target = _target.parent();
    };
    return null;
};
const WXPackageName = app.getPackageName("微信");
const onLookScreenFunc = () => {
    //看一眼屏幕

    // 如果不在微信界面就不去搜索
    if (auto.root != null && WXPackageName != auto.root.packageName()) return setAttention(null, "没有在微信界面~");

    // 找到了开红包按钮就按开
    const openbtn = packageName(WXPackageName).className("android.widget.Button").desc("开").findOnce();
    if (openbtn != null) {
        if (openbtn.click()) return setAttention(openbtn, "我按到了抢! ٩(๑^o^๑)۶");
        else return setAttention(openbtn, "我好像没按到抢？⊙ω⊙");
    };

    // 否则，找到了关闭按钮，再确认一次没有开红包按钮的话，那肯定是领完了，按关闭返回聊天页面
    const closebtn = packageName(WXPackageName).desc("关闭").findOnce();
    if (closebtn != null) {
        const openbtn_ = className("android.widget.Button").desc("开").findOne(500); // 保险起见，再花0.5秒找开红包按钮。
        if (openbtn_ != null) {
            if (openbtn_.click()) return setAttention(openbtn_, "我按到了抢! ٩(๑^o^๑)۶");
            else return setAttention(openbtn_, "我好像没按到抢？⊙ω⊙");
        };
        if (closebtn.click()) return setAttention(closebtn, "嘤嘤嘤，红包被抢完了(TㅅT❀)");
        else return setAttention(closebtn, "关不掉(๑•̌.•̑๑)ˀ̣ˀ̣ 发生了一些意料之外的事情。。");
    };

    // 否则，找到返回按钮，那肯定是在红包领取详情页面，按返回键返回聊天页面
    const backbtn = packageName(WXPackageName).desc("返回按钮").findOnce();
    if (backbtn != null) {
        if (backbtn.click()) return setAttention(backbtn, "你已经抢过这个红包啦~(ㅇㅅㅇ❀)");
        else return setAttention(backbtn, "回不去(๑•̌.•̑๑)ˀ̣ˀ̣ 发生了一些意料之外的事情。。");
    };

    // 否则，那就是在聊天页面，寻找红包，若找到有效红包就点击
    const hongbaotexts = packageName(WXPackageName).className("android.widget.TextView").text("微信红包").find();
    if (hongbaotexts.nonEmpty()) {
        const used_hongbaoobjs = new Array();
        hongbaotexts.forEach((hbtext) => {
            setAttention(hbtext, "发现红包文本，验证是否为红包！");
            const hongbaoobj = gethongbaoobj(hbtext);
            if (hongbaoobj != null) {
                if (hongbaoobj.findOne(textContains("已")) != null) {
                    used_hongbaoobjs.push(hongbaoobj);
                    setAttention(hongbaoobj, "发现红包按钮! 可是这个不可以点。。。╰(⇀‸↼)╯")
                } else {
                    hongbaoobj.click();
                    return setAttention(hongbaoobj, "发现红包按钮! 我点! ! ! (✧∇✧)");
                };

            };
        });
        if (used_hongbaoobjs.length > 0) {
            return setAttention(used_hongbaoobjs[0], "发现红包按钮! 可是没有可以点的了。。。╰(⇀‸↼)╯");
        };
    };

    // 否则，则是在聊天页面且没有红包，什么都不做
    return setAttention(null, "聚精会神ing~");
};

_GlobalVar.running = false;
Control.setClickThing(
    () => {
        _GlobalVar.running = true;
    },
    () => {
        _GlobalVar.running = false;
    },
    () => {
        Control.stop();
    },
    null,
    null,
    null
);

const observeNotification = () => {
    events.observeNotification();
    events.on("notification", function (n) {
        toastLog("收到新通知:\n" +
            "标题: " + n.getTitle() + '\n' +
            "内容: " + n.getText() + '\n' +
            "包名: " + n.getPackageName() + '\n' +
            "时间: " + new Date(n.when) + '\n' +
            "数量: " + n.number + '\n'
        );
        if (n.getPackageName() == WXPackageName && (n.getText().indexOf('[微信红包]') != -1)) {
            toastLog("收到疑似微信红包的新通知:\n" +
                "标题: " + n.getTitle() + '\n' +
                "内容: " + n.getText() + '\n' +
                "包名: " + n.getPackageName() + '\n' +
                "时间: " + new Date(n.when) + '\n' +
                "数量: " + n.number + '\n'
            );
            n.click();
        };
    });
};

const main = () => {
    observeNotification();
    Attention.start();
    setInterval(() => {
        if (_GlobalVar.running) {
            onLookScreenFunc();
        } else {
            Attention.setAttentionArea(0, 0, 0, 0, "", 0);
            _GlobalVar.attentionUiObject = null;
        };
    }, 300);
    Control.start();
    Control.window.exitOnClose();
};

main();