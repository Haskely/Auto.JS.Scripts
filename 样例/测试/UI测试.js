"ui";

/**
 * 启动页面，指导用户赋予必要权限，只需要增添prepare_things即可，后面不用动
 */
_MainUI = {
    AppName:"",
    PackageName:"",
    ActivatyName:"",
    start:()=>{
        ui.layout(
            <vertical>
                <appbar>
                    <toolbar title="主页面"/>
                </appbar>
                <vertical id="switch_container">
                </vertical>
                <vertical id="button_container">
                </vertical>
            </vertical>
        );
        
        ui.emitter.on("start",() => {toast("ui start")});
        
        // 当用户回到本界面时，resume事件会被触发
        ui.emitter.on("resume", _MainUI.refresh);

        _MainUI.setCheckThing(
            '无障碍服务',
            () => {return auto.service != null},
            () => {return app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"})},
            () => {return auto.service.disableSelf()},
        );

        // for (let name in _MainUI.checkThings) {
        //     if (ui.switch_container[name] == null)
        //         ui.switch_container.addView( _MainUI.checkThings[name]['view']);
        // };

        // for (let name in _MainUI.buttonThings) {
        //     if (ui.button_container[name] == null)
        //         ui.button_container.addView( _MainUI.buttonThings[name]['view']);
        // };
    },

    // stop:() => {
    //     ui.finish();
    // },

    // refresh: () => {
    //     for (let name in _MainUI.checkThings) {
    //         _MainUI.checkThings[name].view.checked = _MainUI.checkThings[name].ischecked();
    //     };
    // },

    // checkThings:{},
    // setCheckThing:(name,ischecked,check,uncheck) => {
    //     if (ischecked == null){
    //         if (ui.switch_container != null) 
    //             ui.switch_container.removeView( _MainUI.checkThings[name]['view']);
    //         delete _MainUI.checkThings[name]
    //     } else {
    //         let switch_btn = new android.widget.Switch(context);
    //         switch_btn.checked = ischecked();
    //         switch_btn.attr("id",name);
    //         switch_btn.setText(name);
    //         switch_btn.on("check", (checked) => {
    //             if (checked && !ischecked()){
    //                 check();
    //             };
    //             if (!checked && ischecked()){
    //                 uncheck();
    //             };
    //         });
    //         _MainUI.checkThings[name] = {
    //             'ischecked':ischecked,
    //             'check':check,
    //             'uncheck':uncheck,
    //             'view':switch_btn,
    //         };
    //         if (ui.switch_container != null) 
    //             ui.switch_container.addView( _MainUI.checkThings[name]['view']);
    //     };
    // },

    // beforeStart:()=>{
    //     _MainUI.refresh();     
    //     for (let name in _MainUI.checkThings) {
    //         if (!_MainUI.checkThings[name].view.checked){
    //             toast("请先开启" + name + "!");
    //             return;
    //         };
    //     };
    //     _MainUI.PackageName = currentPackage();
    //     _MainUI.AppName = app.getAppName(_MainUI.PackageName);
    //     _MainUI.ActivatyName = currentActivity();
    //     toastLog('开始啦 time:' + new Date().getTime() + '\nappName:'+_MainUI.AppName + '\ncurrentPackage: ' + _MainUI.PackageName + '\ncurrentActivity: ' + _MainUI.ActivatyName);

    // },
    // buttonThings:{},
    // setButtonThing:(name,startFunc,stopFunc) => {
    //     if (startFunc == null){
    //         if (_MainUI.button_container != null) 
    //             _MainUI.button_container.removeView( _MainUI.buttonThings[name]['view']);
    //         delete _MainUI.buttonThings[name] 
    //     } else {
    //         const theBtn = {
    //             isrunning:false,
    //             startFunc:startFunc,
    //             stopFunc:stopFunc,
    //             view:new android.widget.Button(context),
    //         };
    //         theBtn.view.attr("id",name);
    //         theBtn.view.attr("bg", "#ffffff");
    //         theBtn.view.setText('启动|' + name);
    //         theBtn.view.on("click", () => {
    //             if (theBtn.isrunning) {
    //                 stopFunc();
    //                 theBtn.isrunning = false;
    //                 theBtn.view.setText('启动|' + name);
    //                 theBtn.view.attr("bg", "#ffffff");
    //             } else {
    //                 _MainUI.beforeStart();
    //                 startFunc();
    //                 theBtn.isrunning = true;
    //                 theBtn.view.setText('停止|' + name);
    //                 theBtn.view.attr("bg", "#00ff60");
    //             };
    //         });
    //         _MainUI.buttonThings[name] = theBtn;
    //         if (ui.button_container != null) ui.button_container.addView(theBtn);
    //     };
    // },
};

setTimeout(exit,1000);
// _MainUI.start();