/**
 * 用处：展示给用户一个半透明的小方块
 * 主要API: _Attention.setAttentionArea(x, y, w, h, text="", alpha=0.5) 设置一个关注区域，展示给用户脚本正在关注这里
 */


const _Attention = {
    window: null,
    start: () => {
        const window = floaty.rawWindow(
            <frame gravity="center">
                <card id="card" w="0px" h="0px" alpha="0.0" cardBackgroundColor="#aa000000" cardCornerRadius="10dp"></card>
                <text id="text" text="" textSize="15sp" textColor="#000000" />
            </frame>
        );
        window.setTouchable(true);
        window.setSize(-2, -2);

        window.card.setOnTouchListener(function (view, event) {
            x = event.getRawX();
            y = event.getRawY();
            switch (event.getAction()) {
                
                case event.ACTION_DOWN:
                    log('按下了 x: ' + x + ' y: ' + y);
                case event.ACTION_UP:
                    log('松开了 x: ' + x + ' y: ' + y);
            };
            return true;
        });

        _Attention.window = window;
        _Attention._applyAttentionDesc();
    },
    restore: () => {
        setTimeout(()=>{_Attention.setAttentionArea(0,0,0,0,"",0)},10);
    },
    stop: () => {
        if (_Attention.window != null) {
            _Attention.window.close();
            _Attention.window = null;
        };
    },
    attentionDesc: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
        text: "",
        alpha: 0,
    },
    setAttentionArea: (x, y, w, h, text, alpha) => {
        _Attention.attentionDesc.x = x;
        _Attention.attentionDesc.y = y;
        _Attention.attentionDesc.w = w;
        _Attention.attentionDesc.h = h;
        
        _Attention.attentionDesc.text = text == null ? "" : text;
        _Attention.attentionDesc.alpha = alpha == null ? 0.0 : alpha;

        if (_Attention.window != null) {
            _Attention._applyAttentionDesc();
        };
    },
    _applyAttentionDesc: () => {
        const desc = _Attention.attentionDesc;
        ui.run(() => {
            _Attention.window.setPosition(desc.x, desc.y);
            _Attention.window.card.attr("w", desc.w + 'px');
            _Attention.window.card.attr("h", desc.h + 'px');
            
            _Attention.window.text.setText(desc.text);
            _Attention.window.card.attr("alpha", desc.alpha);
        });
    },
};

_Attention.start();

_Attention.setAttentionArea(500,500,500,200,"啊啦啦啦啦");
sleep(1000);
_Attention.setAttentionArea(100,500,700,300,"(●'◡'●)");
sleep(1000);

// const num_1 = id('').findOne(1000);
// const keyboard = num_1.parent();

rect = keyboard.bounds();
[x, y, w, h] = [rect.left, rect.top, rect.width(), rect.height()];
_Attention.setAttentionArea(x, y, w, h,"密码键盘");
setInterval(()=>{},1000);