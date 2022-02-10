var w = floaty.rawWindow(
    <frame>
    <img w="640" scaleType="fitStart" src="@drawable/ic_perm_identity_black_48dp" alpha="0.4"/>
   </frame>
);

w.setTouchable(false);

setTimeout(()=>{
    w.close();
}, 360000);
//720*1280分辨率显示正常