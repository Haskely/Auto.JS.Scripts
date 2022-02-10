auto.waitFor();

// 用户UI
// if (!floaty.checkPermission()) {
//     // 没有悬浮窗权限，提示用户并跳转请求
//     toast("本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。");
//     floaty.requestPermission();
//     exit();
// };

const _Control = new Object()

const main_frw = floaty.rawWindow(
    <frame gravity="center">
        <vertical>
            <horizontal> 
                <text id="dynamic" text="-" />
                <text id="text" text="按开始按钮开始监控红包" textSize="16sp" textColor="#f44336"/>
            </horizontal>
            <horizontal> 
                <button id="move" text="🖐🏻️"/> 
                <button id="action" text="开始"/> 
                <button id="stop" text="关闭"/>
            </horizontal>
        </vertical>
    </frame>
);
main_frw.setPosition(200, 500);
main_frw.exitOnClose();

_Control.main_frw_speak = (text) => {
    ui.run(()=>{
        main_frw.text.setText(text);
    });
};

_Control.running = false;
main_frw.action.click(()=>{
    if(main_frw.action.text() == '开始'){
        _Control.running = true;
        toastLog("开始抢红包监视协程! ");
        main_frw.action.setText('停止');
        _Control.main_frw_speak("按停止按钮停止监控红包");
    }else{
        _Control.running = false;
        toastLog("停止抢红包监视线程! ");
        main_frw.action.setText('开始');
        _Control.main_frw_speak("按开始按钮开始监控红包");
    }
});
main_frw.stop.click(()=>{
    main_frw.close();
});

main_frw.move.setOnTouchListener(function(view, event){
    const move_x = event.getRawX() - _Control.pre_touch_x;
    const move_y = event.getRawY() - _Control.pre_touch_y;
    switch(event.getAction()){
        case event.ACTION_DOWN:
            _Control.pre_x=main_frw.getX();
            _Control.pre_y=main_frw.getY();
            _Control.pre_touch_x = event.getRawX();
            _Control.pre_touch_y = event.getRawY();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            main_frw.setPosition(move_x + _Control.pre_x, move_y + _Control.pre_y);
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(move_x) < 5 && Math.abs(move_y) < 5){
                toast("请按住移动! ");
            }
            return true;
    }
    return true;
});

const attentionFrw = floaty.rawWindow(
    <frame gravity="center">
        <card id = "card" w="0px" h="0px" alpha = "0.0" cardBackgroundColor="#aa000000" cardCornerRadius="10dp"></card>
    </frame>
);

attentionFrw.setPosition(200, 1000);
attentionFrw.setSize(-2,-2);
attentionFrw.setTouchable(false);
_Control.attention = (ui_obj) => {
    let [x,y,w,h] = [0,0,0,0];
    if (ui_obj != null){
        rect = ui_obj.bounds();
        [x,y,w,h] = [rect.left,rect.top,rect.width(),rect.height()];
    };
    ui.run(()=>{
        attentionFrw.setPosition(x,y);
        attentionFrw.card.attr("w",w + 'px');
        attentionFrw.card.attr("h",h + 'px');
        attentionFrw.card.attr("alpha",0.5);
    });
};

_Control.dynamic_chars = ['-','\\','|','/'];
_Control.dynamic_index = 0;
_Control.process_dynamic = () => {
    ui.run(()=>{
        _Control.dynamic_index +=1;
        if (_Control.dynamic_index >= 4) _Control.dynamic_index = 0;
        main_frw.dynamic.setText(_Control.dynamic_chars[_Control.dynamic_index]);
    });
};

// 抢红包逻辑

/**
 * 若在聊天界面找到"微信红包"文本控件，需要进一步判断它是不是真正的红包，排除是正常聊天的可能性
 * @param {uiobject} hbtext "微信红包"文本控件
 * @returns 红包控件
 */
const gethongbaoobj = (hbtext) => {
    let relat_obj = hbtext.parent();
    if (relat_obj == null) return null;
    if (relat_obj.childCount() != 2) return null;
    let hongbaoobj = relat_obj.parent().parent();
    return hongbaoobj;
};

const look_the_screen = () => {
    //看一眼屏幕

    // 找到了开红包按钮就按开
    const openbtn = className("android.widget.Button").desc("开").findOnce();
    if (openbtn != null) {
        if(openbtn.click()) return ["我按到了抢! ٩(๑^o^๑)۶",openbtn];
        else return ["我好像没按到抢？⊙ω⊙",openbtn];
    };
    
    // 否则，找到了关闭按钮，再确认一次没有开红包按钮的话，那肯定是领完了，按关闭返回聊天页面
    const closebtn = desc("关闭").findOnce();
    if (closebtn != null) {
        const openbtn_ = className("android.widget.Button").desc("开").findOne(500); // 保险起见，再花0.5秒找开红包按钮。
        if (openbtn_ != null) {
            if(openbtn_.click()) return ["我按到了抢! ٩(๑^o^๑)۶",openbtn_];
            else return ["我好像没按到抢？⊙ω⊙",openbtn_];
        };
        if(closebtn.click()) return ["嘤嘤嘤，红包被抢完了(TㅅT❀)",closebtn];
        else return ["关不掉(๑•̌.•̑๑)ˀ̣ˀ̣ 发生了一些意料之外的事情。。",closebtn];
    };

    // 否则，找到返回按钮，那肯定是在红包领取详情页面，按返回键返回聊天页面
    const backbtn = desc("返回按钮").findOnce();
    if (backbtn != null){
        if(backbtn.click()) return ["你已经抢过这个红包啦~(ㅇㅅㅇ❀)",backbtn];
        else return ["回不去(๑•̌.•̑๑)ˀ̣ˀ̣ 发生了一些意料之外的事情。。",backbtn];
    };

    // 否则，那就是在聊天页面，寻找红包，若找到有效红包就点击
    const hongbaotexts = className("android.widget.TextView").text("微信红包").find();
    if (hongbaotexts.nonEmpty()){
        const used_hongbaoobjs = new Array();
        hongbaotexts.forEach((hbtext)=>{
            const hongbaoobj = gethongbaoobj(hbtext);
            if (hongbaoobj != null) {
                if (hongbaoobj.findOne(text("已领取")) != null || hongbaoobj.findOne(text("已过期")) != null){
                    used_hongbaoobjs.push(hongbaoobj);
                } else {
                    hongbaoobj.click();
                    return ["发现红包按钮! 我点! ! ! (✧∇✧)",hongbaoobj];
                };

            };
        });
        if (used_hongbaoobjs.length > 0){
            return ["发现红包按钮! 可是没有可以点的。。。╰(⇀‸↼)╯",used_hongbaoobjs[0]];
        };
    };

    // 否则，则是在聊天页面且没有红包，什么都不做
    return ["聚精会神ing~",null];
};

let run_lock= false;
const run = () => {
    if (_Control.running && !run_lock){
        run_lock = true; //没错，这是一把协程锁

        const [saying,ui_obj] = look_the_screen(); //看一眼屏幕
        _Control.main_frw_speak(saying); //把要说的话显示出来
        _Control.process_dynamic(); //显示呼吸
        _Control.attention(ui_obj); //把关键区域展示出来

        run_lock = false;
    };
};


launchApp('微信');
setInterval(run,33);

const d_w = device.width;
const d_h = device.height;
setInterval(()=>{if (_Control.running) swipe(d_w*0.9, d_h*0.75, d_w*0.9, d_h*0.7, 100);},3000);





