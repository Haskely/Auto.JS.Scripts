auto.waitFor();

// 用户UI
if (!floaty.checkPermission()) {
    // 没有悬浮窗权限，提示用户并跳转请求
    toast("本脚本需要悬浮窗权限来显示悬浮窗，请在随后的界面中允许并重新运行本脚本。");
    floaty.requestPermission();
    exit();
};

const frw_utils = new Object()

const main_frw = floaty.rawWindow(
    <frame gravity="center">
        <card id = "card" alpha = "0.5" cardBackgroundColor="#aa000000" cardCornerRadius="10dp">
            <vertical>
                <horizontal> 
                    <text id="dynamic" text="-" />
                    <text id="text" text="按开始按钮开始玩跳一跳" textSize="16sp" textColor="#f44336"/>
                </horizontal>
                <horizontal> 
                    {/* <button id="move" text="🖐🏻️"/>  */}
                    <button id="action" text="开始"/> 
                    <button id="stop" text="关闭"/>
                </horizontal>
            </vertical>
        </card>
    </frame>
);
main_frw.setPosition(200, 500);
main_frw.setSize(-2,-2);
main_frw.exitOnClose();

frw_utils.main_frw_speak = (text) => {
    ui.run(()=>{
        main_frw.text.setText(text);
    });
};

frw_utils.running = false;
main_frw.action.click(()=>{
    if(main_frw.action.text() == '开始'){
        frw_utils.running = true;
        toastLog("开始玩跳一跳协程！");
        main_frw.action.setText('停止');
        frw_utils.main_frw_speak("按停止按钮停止玩跳一跳");
    }else{
        frw_utils.running = false;
        toastLog("停止玩跳一跳协程！");
        main_frw.action.setText('开始');
        frw_utils.main_frw_speak("按开始按钮开始玩跳一跳");
    }
});
main_frw.stop.click(()=>{
    main_frw.close();
});

main_frw.card.setOnTouchListener((view, event) => {
    const move_x = event.getRawX() - frw_utils.pre_touch_x;
    const move_y = event.getRawY() - frw_utils.pre_touch_y;
    switch(event.getAction()){
        case event.ACTION_DOWN:
            frw_utils.pre_x=main_frw.getX();
            frw_utils.pre_y=main_frw.getY();
            frw_utils.pre_touch_x = event.getRawX();
            frw_utils.pre_touch_y = event.getRawY();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            main_frw.setPosition(move_x + frw_utils.pre_x, move_y + frw_utils.pre_y);
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(move_x) < 5 && Math.abs(move_y) < 5){
                toast("请按住移动！");
            }
            return true;
    }
    return true;
});

frw_utils.dynamic_chars = ['-','\\','|','/'];
frw_utils.dynamic_index = 0;
frw_utils.process_dynamic = () => {
    ui.run(()=>{
        frw_utils.dynamic_index +=1;
        if (frw_utils.dynamic_index >= 4) frw_utils.dynamic_index = 0;
        main_frw.dynamic.setText(frw_utils.dynamic_chars[frw_utils.dynamic_index]);
    });
};


const attention_frw = floaty.rawWindow(
    <frame gravity="center">
        <canvas id = "canvas" w="*" h="*" alpha = "0.5" />
    </frame>
);
attention_frw.setTouchable(false);
attention_frw.setSize(-1,-1);

frw_utils.attention = (ui_obj) => {
    // https://pro.autojs.org/docs/#/zh-cn/canvas
};

// 跳一跳逻辑

// 请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
};

const look_the_screen = () => {
    const frame = captureScreen();
};

setInterval(()=>{},1000);


