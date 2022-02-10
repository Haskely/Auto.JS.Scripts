"ui";
/**
 * 主要API：_PhoneAI.setOnLookScreenFunc()
 * 主要关注：_PhoneAI.Attention
 */
const _PhoneAI = {
    Attention: require('./AttentionFloatyWindow.js'),
    Control: require('./ControlFloatyWindow.js'),
    CanvasWindow: require('./CanvasFloatyWindow.js'),
    MainUI: require('./MainUI.js'),

    mainFuncThread:null,
    start:()=>{
        _PhoneAI.Control.setStartFunction(()=>{
            _PhoneAI.running = true;
        });

        _PhoneAI.Control.setStopFunction(()=>{
            _PhoneAI.running = false;
            _PhoneAI.Attention.restore();
            _PhoneAI.CanvasWindow.restore();
        });

        _PhoneAI.Control.setLongClickFunction(()=>{
            const options = {
                packageName: _PhoneAI.MainUI.PackageName,
                className: _PhoneAI.MainUI.ActivatyName,
            };
            toastLog('收到长按, 执行app.startActivity:\n' +  options);
            // app.launch(_PhoneAI.mainUIPackage);
            // app.startActivity(_PhoneAI.mainUIActivaty);
            if (options.PackageName != null){
                app.startActivity(options);
            };
        });



        _PhoneAI.MainUI.setCheckThing(
            '悬浮窗权限',
            () => {floaty.checkPermission()},
            () => {floaty.requestPermission()},
            () => {floaty.requestPermission()},
        );

        _PhoneAI.MainUI.setButtonThing(
            'DEMO',
            ()=>{
                threads.start(()=>{
                    _PhoneAI.Attention.start();
                    _PhoneAI.CanvasWindow.start();
                    _PhoneAI.Control.start();
                });
                _PhoneAI.mainFuncThread = threads.start(_PhoneAI.mainFunc);
            },
            ()=>{
                _PhoneAI.Attention.stop();
                _PhoneAI.CanvasWindow.stop();
                _PhoneAI.Control.stop();
                _PhoneAI.started = false;
                // if (_PhoneAI.mainFuncThread!=null){
                //     toastLog("中断 _PhoneAI.mainFuncThread ");
                //     _PhoneAI.mainFuncThread.interrupt();
                // };
            });

        _PhoneAI.started = true;
        _PhoneAI.MainUI.start();
    },

    onLookScreenFunc:()=>{},
    setOnLookScreenFunc:(Func)=>{
        _PhoneAI.onLookScreenFunc = Func;
    },

    started:false,
    running:false,
    mainFunc:()=>{
        while(_PhoneAI.started){
            if (_PhoneAI.running) _PhoneAI.onLookScreenFunc();
            sleep(33);
        }; 
    },
};

// const prepare_things = {
//     '无障碍服务':{
//         'ischecked':() => auto.service != null,
//         'check':() => app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"}),
//         'uncheck':() => auto.service.disableSelf(),
//     },
//     '悬浮窗权限':{
//         'ischecked':() => floaty.checkPermission(),
//         'check':() => floaty.requestPermission(),
//         'uncheck':() => floaty.requestPermission(),
//     },
// };

module.exports = _PhoneAI;