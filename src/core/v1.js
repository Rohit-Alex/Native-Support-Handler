import { getFileName } from "./helpers";

// Init obj constants
const ANDROID_OBJ = "androidObj";
const NATIVE_SUPPORT_KEY = "nativeSupport";

// Type constants
const TYPE_FUNCTION = "function";
const TYPE_STRING = "string";

// Callback Constants
const CALLBACK_CLOSED = "callBackClosed";
const CALLBACK_CAMERA = "callBackCamera";
const CALLBACK_SCANNER = "callBackScanner";
const CALLBACK_APPINO = "callBackAppInfo";
const CALLBACK_LOCATION = "callBackLocation";
const CALLBACK_FAILURE = "callBackFailure";
const CALLBACK_PSP_MODAL = 'callBackPSPDialogInfo';
const CALLBACK_SHARE_SCREENSHOT = 'callBackShareScreenShot';
const CALLBACK_SIM_BINDING_DATA = 'callbackPhoneVerificationInfo';
const CALLBACK_OPEN_SIM_BINDING_DEEP_LINK = 'callbackOnFeedbackResult';
const CALLBACK_OPEN_BIOMETRIC = 'callbackAuthenticateApp';
const CALLBACK_SHARE_DOWNLOADABLE_LINK = 'callbackSharePdf';



/*
Native keymap to communicate with native modules
*/
const _nativeKeyMap = {
    CLOSE_WEBVIEW : { "key": 1 },
    OPEN_DEEPLINK : (deeplink) => ({ "key": 2, deeplink }),
    FRONT_CAMERA : { "key": 3 },
    BACK_CAMERA : { "key": 4 },
    SCANNER : { "key": 5 },
    APP_INFO : { "key": 6 },
    FETCH_GEOLOCATION : { "key": 7 },
    OPEN_URL : (url) => ({ "key": 8, url }),
    CLEVER_TRACK_EVENT: (event, eventParams) => ({"key": 9, event, event_params: eventParams || {}}),
    OPEN_PSP_MODAL: (upiIntent, featureName) => ({"key": 22, upiIntent, featureName}),
    SHARE_SCREENSHOT: (shareParams) => ({"key": 18, ...shareParams}),
    SHARE_DOWNLOADABLE_LINK: (url, type = 'application/pdf', fileName = getFileName(), shareOn = 'otherApp') => ({key: 29, url, type, fileName, shareOn}),
    GET_SIM_BINDING_DATA: () => ({"key": 23}),
    OPEN_SIM_BINDING_DEEP_LINK: (link) => ({"key": 24, deeplink: link}),
    OPEN_BIOMETRIC: (title, description) => ({"key": 20, title, description})
}

/**
 * Naitve callbacks which should be present in window for accessing these keys
 */
const _nativeKeyCallback = {
    1 : CALLBACK_CLOSED,
    3 : CALLBACK_CAMERA,
    4 : CALLBACK_CAMERA,
    5 : CALLBACK_SCANNER,
    6 : CALLBACK_APPINO,
    7 : CALLBACK_LOCATION,
    22: CALLBACK_PSP_MODAL,
    18: CALLBACK_SHARE_SCREENSHOT,
    23: CALLBACK_SIM_BINDING_DATA,
    24: CALLBACK_OPEN_SIM_BINDING_DEEP_LINK,
    20: CALLBACK_OPEN_BIOMETRIC,
    29: CALLBACK_SHARE_DOWNLOADABLE_LINK
}

/**
 * @name _isAFunction
 * @description Function validator
 * @param {*} item 
 */
const _isAFunction = (item) => typeof item === TYPE_FUNCTION

/**
 * @name _setAndroidClass
 * @description Set AndroidClass in window object for native injection
 */
const _setAndroidClass = () => {
    window.androidObj = function AndroidClass(){};
    sessionStorage.setItem(ANDROID_OBJ, window.androidObj); 
}

/**
 * @name _isNativeActivated
 * @description Checks the native support
 */
const _isNativeActivated = () => {
    // eslint-disable-next-line no-prototype-builtins
    return _isAFunction(window.androidObj) && window.androidObj.hasOwnProperty(NATIVE_SUPPORT_KEY)
}

/**
 * @name renderParams
 * @description Sanity handelr for params
 * @param {*} params 
 */
const renderParams = (params) => typeof params === TYPE_STRING ? params : JSON.stringify(params);


/**
 * @name parseParams
 * @description Parse params into obj for callback check
 * @param {*} params 
 */
const parseParams = (params) => typeof params != TYPE_STRING ? params : JSON.parse(params);


/**
 * @name init
 * @description Injects & checks for support key which is getting injected from Native
 */
const _init = () => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, _) => {
        _setAndroidClass()
        const checkNativeSupport = setInterval(() => {
            console.log('%c << 🤖>> Checking native capability', 'color: white; font-weight: bold;');
            if (_isNativeActivated()) {
                console.log('%c << 🤖>> Native integration successfull ✅ ✅ ✅ ✅ ✅ ', 'color: white; font-weight: bold;');
                clearInterval(checkNativeSupport)
                resolve(true)
            }
        }, 500)
    })
}

/**
 * @name call
 * @description Method exposed to child components to access the functionality
 * @param {*} params 
 */
const _call = (params) => {
    if (!_isNativeActivated()) {
        console.log('%c << 🤖>> No native capability', 'color: red; font-weight: bold;');
        return;
    }
    const stringParams = JSON.stringify(params);
    console.log('%c << 🤖>> Requesting native method', 'color: limegreen; font-weight: bold;', stringParams);

    // Check for respective callback
    const paramsObj = parseParams(params);
    const requiredCallback = _nativeKeyCallback[paramsObj.key];
    if (requiredCallback) {
        if (!window[requiredCallback]) {
            console.log('%c << 🤖>> Callback not found', 'color: red; font-weight: bold;', requiredCallback);
            return;
        }

        if (!window[CALLBACK_FAILURE]) {
            console.log('%c << 🤖>> Warning - Failure callback not found, Always better to have', 'color: orange; font-weight: bold;', CALLBACK_FAILURE);
        }
    }

    window.androidObj.nativeSupport(renderParams(params));
    console.log('%c << 🤖>> Request successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', stringParams);
}


export default {
    init: _init,
    call: _call,
    ..._nativeKeyMap
}