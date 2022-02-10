Attention = require('./Common/AttentionFloatyWindow.js');
Control = require('./Common/ControlFloatyWindow.js');
CanvasWindow = require('./Common/CanvasFloatyWindow.js');

const findTopClickableUiObjects = (rootUiObject, includeRoot) => {
    if (rootUiObject == undefined) rootUiObject = auto.root;
    const topClickableUiObjects = new Array();
    const UiObjQuene = new Array();
    if (includeRoot) {
        UiObjQuene.push(rootUiObject);
    } else {
        rootUiObject.children().forEach((child) => { UiObjQuene.push(child) });
    };
    while (UiObjQuene.length > 0) {
        UiObj = UiObjQuene.shift();
        if (UiObj != null) {
            if (UiObj.clickable()) topClickableUiObjects.push(UiObj);
            else UiObj.children().forEach((child) => { UiObjQuene.push(child) });
        };
    };
    return topClickableUiObjects;
};

const findBottomClickableUiObjects = (rootUiObject) => {
    if (rootUiObject == undefined) rootUiObject = auto.root;
    const bottomClickableUiObjects = new Array();

    const _temp = (uiObj) => {
        const topClickableChildren = findTopClickableUiObjects(uiObj, false);
        if (topClickableChildren.length > 0) {
            topClickableChildren.forEach((clickableChild) => {
                _temp(clickableChild)
            });
        } else if (uiObj.clickable()) {
            bottomClickableUiObjects.push(uiObj)
        };
    };

    _temp(rootUiObject);
    return bottomClickableUiObjects;
};

const _GlobalVar = {};

_GlobalVar.attentionUiObjects = [];
CanvasWindow.setDrawFunc('topClickableUiObjects', (canvas) => {
    const paint = new Paint();
    paint.setStrokeWidth(5);
    paint.setARGB(255, 0, 0, 255);
    paint.setStyle(Paint.Style.STROKE);
    _GlobalVar.attentionUiObjects.forEach((uiObj) => {
        canvas.drawRect(uiObj.bounds(), paint);
    });
});

_GlobalVar.dc = ['-', '\\', '|', '/'];
_GlobalVar.di = 0;
const onLookScreenFunc = () => {
    _GlobalVar.di += 1;
    if (_GlobalVar.di >= 4) _GlobalVar.di = 0;
    _GlobalVar.attentionUiObjects = findBottomClickableUiObjects();
    if (_GlobalVar.attentionUiObjects.length > 0) {
        rect = _GlobalVar.attentionUiObjects[0].bounds();
        [x, y, w, h] = [rect.left, rect.top, rect.width(), rect.height()];
        Attention.setAttentionArea(x, y, w, h, _GlobalVar.dc[_GlobalVar.di]);
    };
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



const start = () => {
    Attention.start();
    CanvasWindow.start();
    setInterval(() => {
        if (_GlobalVar.running) {
            onLookScreenFunc();
        } else {
            Attention.setAttentionArea(0, 0, 0, 0, "", 0);
            _GlobalVar.attentionUiObjects = [];
        };
    }, 33);
    Control.start();
    Control.window.exitOnClose();
};

start();