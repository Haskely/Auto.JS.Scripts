
toastLog('开始啦 time:' + new Date().getTime() + 
'\nappName:'+app.getAppName(currentPackage()) + 
'\ncurrentPackage: ' + currentPackage() + 
'\ncurrentActivity: ' + currentActivity() +
'\nauto.root.packageName: ' + auto.root.packageName() + 
'\nauto.root.packageName -> appName: ' + app.getAppName(auto.root.packageName()) + 
'\n脚本Package: ' + context.getPackageName() + 
'\n脚本appName: ' + app.getAppName(context.getPackageName()));


