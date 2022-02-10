/**
 * 方便用户控制脚本运行，长按效果
 * 主要API：_Control.setMainThreadFunction()
 *          _Control.setLongClickFunction()
 */

const _Control = {
    window: null,
    start: () => {
        const window = floaty.rawWindow(
            <frame id="frame" gravity="center">
                <card id="button" w="300px" h="150px" foreground="?selectableItemBackground" cardBackgroundColor="#ffffffff" cardCornerRadius="10dp" gravity="center">
                    <text id="text" text="" textSize="21sp" margin="10" textStyle="bold" typeface="monospace" layout_gravity="center" gravity="center" />
                </card>
            </frame>
        );
        window.setSize(-2, -2);
        window.setPosition(device.width * 0.5, device.height * 0.25);

        const color_str = window.button.attr("cardBackgroundColor");
        const _touchVar = {
            down_win_x: null,
            down_win_y: null,
            down_touch_x: null,
            down_touch_y: null,
            down_touch_time: null,

            longclickThresholdMs: 500, // 500 ms
            origin_button_color: {
                a: colors.alpha(color_str),
                r: colors.red(color_str),
                b: colors.blue(color_str),
                g: colors.green(color_str)
            },
            longclick_button_color: { a: 255, r: 255, b: 0, g: 0 },
            longclickColorIntervalID: null,

            isPressing: false,

        };
        window.button.setOnTouchListener(function (view, event) {
            const colorObj2Str = (colorObj) => { return colors.toString(colors.argb(colorObj.a, colorObj.r, colorObj.g, colorObj.b)) };

            const onPressing = () => {
                let k = 0;
                if (_touchVar.isPressing) {
                    const touchDuration = new Date().getTime() - _touchVar.down_touch_time;
                    k = touchDuration / _touchVar.longclickThresholdMs;
                } else {
                    clearInterval(_touchVar.longclickColorIntervalID);
                };

                if (k < 1.0) {
                    if (_Control.window.button.text.text() == _Control.clickThing.longclickText) {
                        _Control.window.button.text.setText(_Control.running ? _Control.clickThing.stopText : _Control.clickThing.startText);
                    };
                    const oColor = _touchVar.origin_button_color;
                    const tColor = _touchVar.longclick_button_color;
                    const curColor = {};

                    for (let x in oColor) {
                        curColor[x] = (tColor[x] - oColor[x]) * k + oColor[x];
                    };
                    window.button.attr("cardBackgroundColor", colorObj2Str(curColor));
                }
                else {
                    _Control.window.button.text.setText(_Control.clickThing.longclickText);
                };
            };

            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    _touchVar.down_win_x = window.getX();
                    _touchVar.down_win_y = window.getY();
                    _touchVar.down_touch_x = event.getRawX();
                    _touchVar.down_touch_y = event.getRawY();
                    _touchVar.down_touch_time = new Date().getTime();
                    _touchVar.isPressing = true;

                    _touchVar.longclickColorIntervalID = setInterval(onPressing, 33);
                    return true;
                case event.ACTION_MOVE:
                    //移动手指时调整悬浮窗位置
                    const move_x = event.getRawX() - _touchVar.down_touch_x;
                    const move_y = event.getRawY() - _touchVar.down_touch_y
                    if ((Math.abs(move_x) > 10 && Math.abs(move_y) > 10)) {
                        window.setPosition(move_x + _touchVar.down_win_x, move_y + _touchVar.down_win_y);
                        _touchVar.isPressing = false;
                    };
                    return true;
                case event.ACTION_UP:

                    const touchDuration = new Date().getTime() - _touchVar.down_touch_time;
                    //手指弹起时如果偏移很小则判断为点击
                    if (_touchVar.isPressing) {
                        if (touchDuration > _touchVar.longclickThresholdMs) {
                            _Control.longclick();
                        } else {
                            _Control.click();
                        };
                    };
                    _touchVar.isPressing = false;
                    onPressing();
                    return true;
            }
            return true;
        });
        _Control.window = window;
        _Control.window.button.text.setText(_Control.clickThing.startText);
    },
    // restore:()=>{

    // },
    stop: () => {
        if (_Control.running) _Control.click();
        _Control.window.close();
    },

    running: false,
    click: () => {
        if (!_Control.running) {
            toastLog("按下了开始键! ");
            _Control.clickThing.startFunc();
            _Control.window.button.text.setText(_Control.clickThing.stopText);
            _Control.running = true;
        } else {
            toastLog("按下了停止键! ");
            _Control.clickThing.stopFunc();
            _Control.window.button.text.setText(_Control.clickThing.startText);
            _Control.running = false;
        };
    },
    longclick: () => { _Control.clickThing.longclickFunc() },

    clickThing: {
        startText: '开始',
        stopText: '停止',
        longclickText: '关闭',
        startFunc: () => { },
        stopFunc: () => { },
        longclickFunc: () => { },
    },
    setClickThing: (startFunc, stopFunc, longclickFunc, startText, stopText, longclickText) => {
        if (startFunc != null) _Control.clickThing.startFunc = startFunc;
        if (stopFunc != null) _Control.clickThing.stopFunc = stopFunc;
        if (longclickFunc != null) _Control.clickThing.longclickFunc = longclickFunc;
        if (startText != null) _Control.clickThing.startText = startText;
        if (stopText != null) _Control.clickThing.stopText = stopText;
        if (longclickText != null) _Control.clickThing.longclickText = longclickText;
    },
};

module.exports = _Control;