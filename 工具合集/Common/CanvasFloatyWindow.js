/**
 * 用于在全屏幕做标记
 * 主要API: _CanvasWindow.setDrawFunc(name, drawFunc)
 * drawFunc = (canvas) => {};
 */
const _CanvasWindow = {
    start: () => {

        const window = floaty.rawWindow(
            <frame gravity="center">
                <canvas id="canvas" w="*" h="*" />
            </frame>
        );
        window.setTouchable(false);
        window.setSize(-1, -1);

        window.canvas.on('draw', (canvas) => {
            canvas.drawColor(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
            canvas.drawColor(colors.argb(10, 0, 0, 255));
            for (let name in _CanvasWindow.drawFunc_collections) {
                _CanvasWindow.drawFunc_collections[name](canvas);
            };
        });

        _CanvasWindow.window = window;

    },
    stop: () => {
        _CanvasWindow.window.close();
    },
    drawFunc_collections: {},
    setDrawFunc: (name, drawFunc) => {
        if (drawFunc == null) {
            delete _CanvasWindow.drawFunc_collections[name]
        } else {
            _CanvasWindow.drawFunc_collections[name] = drawFunc;
        };
    },

    setPoint: (name, point) => {
        const pointdrawF = point == null ? null : (canvas) => {
            const paint = new Paint();
            paint.setStyle(Paint.Style.FILL);
            paint.setARGB(255, 0, 0, 255);
            paint.setStrokeWidth(20);
            canvas.drawPoint(point[0], point[1], paint);
        };
        _CanvasWindow.setDrawFunc(name, pointdrawF);
    },
    setRect: () => {

    },
    setCircle: () => {

    },
    setLine: () => {

    },
    setText: () => {

    },

};

module.exports = _CanvasWindow;