_Obj = {
    x:0,
    get_x:() => _Obj.x,
};

const get_x = () => _Obj.get_x();

setInterval(()=>{_Obj.x += 1},500);
setInterval(()=>{log('get_x: ' + get_x())},1000);


setTimeout(exit,5000)