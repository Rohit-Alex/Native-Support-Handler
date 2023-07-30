
import { _isNativeActivated } from './helpers';
import  { _init, _initUDP } from './init'
import NativeInterface from './interface/NativeInterfaceLegacy';
import { REFRESH_NATIVE_FEEDS } from './constants';

/*
Native keymap to communicate with native modules
*/
const _nativeCallBackMap = {
    closeWebView : () => new NativeInterface()._callBackClosed(),
    openDeeplink : (link) => new NativeInterface()._openDeeplink(link),
    openFrontCamera : () => new NativeInterface()._callBackCamera("FRONT"),
    openBackCamera : () => new NativeInterface()._callBackCamera(),
    openScanner : () => new NativeInterface()._callBackScanner(),
    getAppInfo : () => new NativeInterface()._callBackAppInfo(),
    getToken : () => new NativeInterface()._fetchToken(),
    fetchGeoLocation : () => new NativeInterface()._callBackLocation(),
    openUrl : (url) => new NativeInterface()._openUrl(url),
    cleverTrackEvent : (event, eventParams) => new NativeInterface()._cleverTrackEvent(event, eventParams),
    openPSPModal: (upiIntent, featureName) => new NativeInterface()._openPSPModal(upiIntent, featureName),
    shareScreenshot: (shareParams) => new NativeInterface()._callBackShareScreenshot(shareParams),
    shareDownloadableLink: (url, type, fileName, shareOn) => new NativeInterface()._shareDownloadableLink(url, type, fileName, shareOn),
    getSimBindingData: () => new NativeInterface()._getSimBindingData(),
    openSimBindingDeepLink: (link) => new NativeInterface()._openSimBindingDeepLink(link),
    openBiometric: (title, description) => new NativeInterface()._openBiometric(title, description),
    subscribeBackButton: () => new NativeInterface()._subscribeBackButton(),
    subscribeBackPress: (backPressCallback, failureCallback) => new NativeInterface()._subscribeBackPress(backPressCallback, failureCallback),
    overrideBackPress: (backPressCallback) => new NativeInterface()._overrideBackPress(backPressCallback),
    initAutoRead: (lapseTime) => new NativeInterface()._initOTPAutoRead(lapseTime),
    callbackAutoReadOTP: () => new NativeInterface()._callbackAutoReadOTP(),
    homeFeedRefresh: (apiCodes) => new NativeInterface()._callBackHomeFeedRefresh(apiCodes),
    callbackFileRequestFromGallery: () => new NativeInterface()._callbackFileRequestFromGallery(),
    callbackShareViaWhatsapp: (url, text, type) => new NativeInterface()._callbackShareWhatsapp(url, text, type),
    callbackShareViaOthers: (url, text) => new NativeInterface()._callbackShareViaOthers(url, text),
    downloadImage: (url, text) => new NativeInterface()._callbackDownloadImage(url, text),
    callbackGetContactsList: () => new NativeInterface()._callbackGetContactsList(),
    openSMS: (number, message) => new NativeInterface()._openSMS(number, message),
    initSmsSync: () => new NativeInterface()._initSmsSync(),
    callBackOnSubscribeSmsSync: () => new NativeInterface()._callBackOnSubscribeSmsSync(),
    openDialer: (mobile) => new NativeInterface()._openDialer(mobile), 
    openMap: (lat, long, zoom,label, address) => new NativeInterface()._openMap(lat, long, zoom,label, address), 
    hideLoader: () => new NativeInterface()._hideLoader(),
    showLoader: (retry) => new NativeInterface()._showLoader(retry), 
    getAndroidPermissions: permissions => new NativeInterface()._getAndroidPermissions(permissions),
    shareByteArrayOrLinkToOtherApps: (isUrl, data) => new NativeInterface()._shareByteArrayOrLinkToOtherApps(isUrl, data),
    openPosScanner: type => new NativeInterface()._openPOSScanner(type),
    shareBranchLink: (channel, msg, link) => new NativeInterface()._shareBranchLink(channel, msg, link),
    shareAppsflyerLink: (channel, msg, link) => new NativeInterface()._shareAppsFlyerLink(channel, msg, link),
    logOut: () => new NativeInterface()._logOut(),
    onAudioAlertStatusCallback: () => new NativeInterface()._onAudioAlertStatusCallback(),
    setAudioAlertStatus: (isTtsEnable) => new NativeInterface()._changeAudioAlert(isTtsEnable),

    checkPermissionStatus: (permissions) => new NativeInterface()._checkPermissionStatus(permissions),
    requestPermissions: (permissions) => new NativeInterface()._requestPermissions(permissions),
    openAppSettings: () => new NativeInterface()._openAppSettings(),
    triggerPLotlineFunnel: () => new NativeInterface()._triggerPLotlineFunnel(),
    nativeFileUpload: () => new NativeInterface()._nativeFileUpload(),
}

export default {
    init: () => _init(true),
    initImmediate: () => _initUDP(true),
    isNativeInitialized: () => _isNativeActivated(),
    ..._nativeCallBackMap,
    Constants: {...REFRESH_NATIVE_FEEDS}
}