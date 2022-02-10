console.show();

events.observeNotification();
events.on("notification", function(n){
    toastLog("收到新通知:\n" +
        "标题: " + n.getTitle() + '\n' +
        "内容: " + n.getText() +  '\n' +
        "包名: " + n.getPackageName() + '\n' +
        "时间: " + new Date(n.when) + '\n' +
        "数量: " + n.number + '\n'
        );
});

setInterval(()=>{toast('监听中...')},5000);

// events.on("notification", function(n){
//     log("收到新通知:\n" +
//         "标题: " + n.getTitle() + '\n' +
//         "内容: " + n.getText() +  '\n' +
//         "包名: " + n.getPackageName() + '\n' +
//         "时间: " + new Date(n.when) + '\n' +
//         "数量: " + n.number + '\n'
//         );
//     n.click();
// });

// events.on("notification", function(n){
//     log("收到新通知:\n" +
//         "标题: " + n.getTitle() + '\n' +
//         "内容: " + n.getText() +  '\n' +
//         "包名: " + n.getPackageName() + '\n' +
//         "时间: " + new Date(n.when) + '\n' +
//         "数量: " + n.number + '\n'
//         );
//     n.delete();
// });