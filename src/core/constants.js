// Init obj constants
const ANDROID_OBJ = "androidObj";
const NATIVE_SUPPORT_KEY = "nativeSupport";

// Type constants
const TYPE_FUNCTION = "function";
const TYPE_STRING = "string";

/*
Native keymap to communicate with native modules
*/
const nativeKeyMap = {
    CLOSE_WEBVIEW : 1,
    OPEN_DEEPLINK : 2,
    FRONT_CAMERA : 3,
    BACK_CAMERA : 4,
    SCANNER : 5,
    APP_INFO : 6,
    FETCH_GEOLOCATION : 7,
    OPEN_URL : 8,
    CLEVER_TRACK: 9,
    PSP_MODAL: 22,
    SHARE_SCREENSHOT: 18,
    SIM_DATA: 23,
    OPEN_SIM_BINDING_LINK: 24,
    OPEN_BIOMETRIC: 20,
    SHARE_DOWNLOADABLE_LINK: 29,
    SUBSCRIBE_BACK_BUTTON: 30,
    INIT_OTP_AUTOREAD: 33,
    REFRESH_HOME_FEED: 35,
    INIT_SMS_SYNC:50,
    SUBSCRIBE_SMS_SYNC: 51,
    DOWNLOAD_IMAGE: 58,
    LOG_OUT:63,
    AUDIO_ALERT_STATUS:'64',
    SET_AUDIO_ALERT:'65',
    CHECK_PERMISSIONS_STATUS: '53',
    REQUEST_PERMISSIONS: '52',
}

/*
Native keymap to communicate with native modules (Legacy)
TODO: Merchant App IOS is handling string keys (Therefore as a temp workaround we are using KeyMap as strings)
*/
const nativeKeyMapLegacy = {
    CLOSE_WEBVIEW : "1",
    OPEN_DEEPLINK : "2",
    FRONT_CAMERA : "3",
    BACK_CAMERA : "4",
    SCANNER : "14",
    APP_INFO : "6",
    FETCH_GEOLOCATION : "12",
    OPEN_URL : "8",
    CLEVER_TRACK: "9",
    PSP_MODAL: "22",
    SHARE_SCREENSHOT: "18",
    SIM_DATA: "23",
    OPEN_SIM_BINDING_LINK: "24",
    OPEN_BIOMETRIC: "20",
    SHARE_DOWNLOADABLE_LINK: "29",
    SUBSCRIBE_BACK_BUTTON: "30",
    INIT_OTP_AUTOREAD: "33",
    REFRESH_HOME_FEED: "35",
    SEND_SMS: "41",
    SHARE_URL_ON_WHATSAPP: "42",
    REQUEST_IMAGE: "43",
    SHARE_URL_ON_OTHERS: "44",
    CONTACTS_INFO: "16",
    INIT_SMS_SYNC:"50",
    SUBSCRIBE_SMS_SYNC: "51",
    SHOW_LOADER: '45',
    HIDE_LOADER: '46',
    OPEN_DIALER: '47',
    OPEN_MAP:'48',
    SHARE_BYTE_OR_LINK: '15',
    ANDROID_PERMISSIONS: '37',
    POS_SCANNER: '49',
    BRANCH_SHARE_LINK: '28',
    APPSFLYER_SHARE_LINK: '38',
    DOWNLOAD_IMAGE: '58',
    LOG_OUT:'63',
    AUDIO_ALERT_STATUS:'64',
    SET_AUDIO_ALERT:'65',
    CHECK_PERMISSIONS_STATUS: '53',
    REQUEST_PERMISSIONS: '52',
    OPEN_APP_SETTINGS: '69',
    TRIGGER_PLOTLINE_FUNNEL: '110',
    FILE_REQUEST: '70',
}

/**
 * PSP modal constant which comming from native
 */
const PSP_MODAL_STATUS = {
    MODAL_CALOSED: 'USER_CLOSED',
    PAYMENT_STARTED: 'PAYMENT_STARTED',
    PAYMENT_COMPLETED: 'PAYMENT_COMPLETED',
    INVALID_PARAMS: 'INVALID_PARAMS',
    NO_PSP_INSTALLED: 'NO_PSP_INSTALLED'
}


const PERMISSIONS_KEYS =  {
    1: 'android.permissions.ACCESS_FINE_LOCATION',
    2: 'android.permissions.WRITE_EXTERNAL_STORAGE',
    3: 'android.permissions.CAMERA',
    4: 'android.permissions.READ_CONTACTS'
}

/*
Key Mapping for APIs and their respective codes for home feed refresh 
*/
const REFRESH_NATIVE_FEEDS = {
    REFRESH_USER_INFO : 1,
    REFRESH_UPI_TRANSACTION : 2,
    REFRESH_SETTLEMENTS : 3,
    REFRESH_BP_CARD_DETAILS : 4,
    REFRESH_DYNAMIC_MENUS : 5,
    REFRESH_MESSAGES : 6,
    REFRESH_BP_CONFIG_MODEL : 7,
    REFRESH_ROUTES : 8
}

export {
    ANDROID_OBJ,
    NATIVE_SUPPORT_KEY,
    TYPE_FUNCTION,
    TYPE_STRING,
    nativeKeyMap,
    nativeKeyMapLegacy,
    PSP_MODAL_STATUS,
    REFRESH_NATIVE_FEEDS, 
    PERMISSIONS_KEYS
}