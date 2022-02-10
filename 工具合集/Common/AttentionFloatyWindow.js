/**
 * 用处：展示给用户一个半透明的小方块
 * 主要API: _Attention.setAttentionArea(x, y, w, h, text="", alpha=0.5) 设置一个关注区域，展示给用户脚本正在关注这里
 */
// Attention.setAttentionArea(500,500,500,200,"啊啦啦啦啦");
// sleep(1000);
// Attention.setAttentionArea(100,500,700,300,"(●'◡'●)");

const _Attention = {
    window: null,
    start: () => {
        const window = floaty.rawWindow(
            <frame gravity="center">
                <card id="card" w="0px" h="0px" alpha="0.0" cardBackgroundColor="#aa000000" cardCornerRadius="10dp"></card>
                <text id="text" text="" textSize="15sp" textColor="#000000" />
            </frame>
        );
        window.setTouchable(false);
        window.setSize(-2, -2);

        _Attention.window = window;
        _Attention._applyAttentionDesc();
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
        (x != null) && (_Attention.attentionDesc.x = x);
        (y != null) && (_Attention.attentionDesc.y = y);
        (w != null) && (_Attention.attentionDesc.w = w);
        (h != null) && (_Attention.attentionDesc.h = h);
        
        (text != null) && (_Attention.attentionDesc.text = text);
        (alpha != null) && (_Attention.attentionDesc.alpha = alpha);

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

module.exports = _Attention;