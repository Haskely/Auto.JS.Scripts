const checkAccessibilityService = () => (!!auto.rootInActiveWindow)

toastLog(checkAccessibilityService());

if (!checkAccessibilityService()){
    auto.waitFor();
};


if (!checkAccessibilityService()){
    app.startActivity({action: "android.settings.ACCESSIBILITY_SETTINGS"});
};
