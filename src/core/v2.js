
import { _isNativeActivated } from './helpers';
import  { _init, _initUDP } from './init'
import NativeInterface from './interface/NativeInterface';
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
    initSmsSync: () => new NativeInterface()._initSmsSync(),
    callBackOnSubscribeSmsSync: () => new NativeInterface()._callBackOnSubscribeSmsSync(),  
}

export default {
    init: () => _init(true),
    initImmediate: () => _initUDP(true),
    isNativeInitialized: () => _isNativeActivated(),
    ..._nativeCallBackMap,
    Constants: {...REFRESH_NATIVE_FEEDS}
}