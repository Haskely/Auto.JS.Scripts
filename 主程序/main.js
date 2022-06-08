"ui";

const MainUI = require('./Common/MainUI.js');
// MainUI.setCheckThing(
//     '悬浮窗权限',
//     () => {return floaty.checkPermission()},
//     () => {return floaty.requestPermission()},
//     () => {return floaty.requestPermission()},
// );

// const _GlobalVar = {
//     jsFilePaths:null,
// };
const setScriptButtons = () => {
    const rootPath = files.cwd();
    const jsFileNames = files.listDir(rootPath, (fn) => (fn != 'main.js' && fn.endsWith(".js") && files.isFile(files.join(rootPath, fn))));
    jsFileNames.forEach((_fn) => {
        const fn = _fn;
        const fp = files.join(rootPath, fn);
        MainUI.setButtonThing(
            fn,
            () => {
                const all_engines = engines.all();
                for (let i = 0; i < all_engines.length; i++) {
                    if (all_engines[i].source == fp) {
                        return true;
                    };
                };
                return false;
            },
            () => {
                log('启动|' + fn);
                engines.execScriptFile('./' + fn);
            },
            () => {
                log('停止|' + fn);
                engines.all().forEach((eng) => {
                    if (eng.source == fp) {
                        eng.forceStop();
                        return;
                    };
                });
            },
        );
    });

    // const jsFilePaths = jsFileNames.map((fn) => files.join(rootPath, fn));
    // _GlobalVar.jsFilePaths = jsFilePaths;
};

setScriptButtons();

MainUI.start();

