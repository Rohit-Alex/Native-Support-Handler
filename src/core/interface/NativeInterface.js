
import  { nativeKeyMap, TYPE_STRING, PSP_MODAL_STATUS, nativeKeyMapLegacy } from '../constants'
import  { renderParams, _isNativeActivated, parseParams, getFileName, setObjectProp, getURLParameter } from '../helpers'


class NativeInterface {

    constructor() {
        this.nativeSupport = false;
        
        // Native support check
        if (_isNativeActivated()) {
            this.nativeSupport = true;
        }
        else {
            console.log('%c << 🤖>> No native capability', 'color: red; font-weight: bold;');
        }
    }

    /**
     * @name callBackClosed
     * @description Handles the native communication to call & receive the data from close web view
     */
    _callBackClosed () {
        return new Promise((resolve, reject) => {
            window.callBackClosed = (data) => {
                if (data) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackClosed', data);
                    resolve(data);
                } 
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackClosed', data);
                    reject("Invalid data");
                }
            };

            window.callBackFailure = (err) => {
                reject("Native call back failed", err);
            }

            if (!this.nativeSupport) {
                reject();
                return;
            }

            const payload = renderParams({ "key": nativeKeyMap.CLOSE_WEBVIEW })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackClosed', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackCamera
     * @description Handles the native communication to open the front/back camera and recevices the base64 image
     * @param {boolean} front 
     */
    _callBackCamera (front) {
        return new Promise((resolve, reject) => {
            window.callBackCamera = (data) => {
                if (data) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackCamera', data);
                    resolve(data);
                } 
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackCamera', data);
                    reject("Invalid data");
                }
            };

            window.callBackFailure = (err) => {
                reject("Native call back failed", err);
            }

            if (!this.nativeSupport) {
                reject()
                return;
            }

            const payload = renderParams({ "key": (front) ? nativeKeyMap.FRONT_CAMERA : nativeKeyMap.BACK_CAMERA })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackCamera', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackScanner
     * @description Handles the native communication to call & receive scanner Data
     */
    _callBackScanner () {
        return new Promise((resolve, reject) => {
            window.callBackScanner = (data) => {
                if (data) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackScanner', data);
                    resolve(data);
                } 
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackScanner', data);
                    reject("Invalid data");
                }
            };

            window.callBackFailure = (err) => {
                reject("Native call back failed", err);
            }

            if (!this.nativeSupport) {
                reject()
                return;
            }

            const payload = renderParams({ "key": nativeKeyMap.SCANNER })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackScanner', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackAppInfo
     * @description Handles the native communication to call & receive app info
     */
    _callBackAppInfo () {
        return new Promise((resolve, reject) => {
            window.callBackAppInfo = (data) => {
                if (data) {
                    const parsedData = parseParams(data);
                    const {token} = parsedData;
                    if (token) {
                        console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'token', token);
                        resolve(token);
                    } else {
                        console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'token', data);
                        reject("Invalid token");
                    }
                }
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'token', data);
                    reject("Invalid data");
                }
            };

            window.callBackFailure = (err) => {
                reject("Native call back failed", err);
            }

            if (!this.nativeSupport) {
                reject()
                return;
            }

            const payload = renderParams({ "key": nativeKeyMap.APP_INFO })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackAppInfo', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name _fetchToken
     * @description Handles the native communication to call & receive app info
     */
         _fetchToken() {
            return new Promise((resolve, reject) => {
                window.callBackappInfo = (data) => {
                    if (data && data.token) {
                        const {token} = data;
                        console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'token', token);
                        resolve(token);
                    }
                    else {
                        console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'token', data);
                        reject("Invalid token");
                    }
                };
    
                const token = getURLParameter(window.location.href, 'token') || getURLParameter(window.location.href, 'visa');
                if (token) {
                    resolve(token);
                }
    
                window.callBackFailure = (err) => {
                    reject("Native call back failed", err);
                }
    
                if (!this.nativeSupport) {
                    reject()
                    return;
                }
    
                const payload = renderParams({ "key": nativeKeyMapLegacy.APP_INFO })
    
                console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'fetching token');
                window.androidObj.nativeSupport(payload);
            })
        }

    /**
     * @name callBackLocation
     * @description Handles the native communication to call & receive geolocation data
     */
    _callBackLocation () {
        return new Promise((resolve, reject) => {
            window.callBackLocation = (data) => {
                if (data) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackLocation', data);
                    resolve(data);
                } 
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackLocation', data);
                    reject("Invalid data");
                }
            };

            window.callBackFailure = (err) => {
                reject("Native call back failed", err);
            }

            if (!this.nativeSupport) {
                reject()
                return;
            }

            const payload = renderParams({ "key": nativeKeyMap.FETCH_GEOLOCATION })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackLocation', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name openDeeplink
     * @description Handles the native communication to open deeplink
     */
    _openDeeplink (deeplink) {
        if (!this.nativeSupport) return;

        window.callBackDeeplink = res => {
            console.log("Deeplink", res)
        }
        const payload = renderParams({ "key": nativeKeyMap.OPEN_DEEPLINK, deeplink })
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openDeepLink', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name openUrl
     * @description Handles the native communication to open url
     */
    _openUrl (url) {
        if (!this.nativeSupport) return;
        const payload = renderParams({ "key": nativeKeyMap.OPEN_URL, url })
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openUrl', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name cleverTrackEvent
     * @description Handles the native communication to register Clever Track Events
     */
    _cleverTrackEvent (event = '', eventParams = {}) {
        
        if (typeof eventParams !== 'object') {
            console.log('%c << 🤖>> eventParams type must be an object', 'color: red; font-weight: bold;', 'cleverTrackEvent', 'typeof eventParams', typeof eventParams);
            return;
        }

        if (!this.nativeSupport) return;

        const payload = renderParams({ "key": nativeKeyMap.CLEVER_TRACK, event, event_params: eventParams });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'cleverTrackEvent', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name openPSPModal
     * @description Handles the PSP MOdal and sends a callback
     */
    _openPSPModal (upiIntent, featureName) {
        
        return new Promise((resolve, reject) => {
            // check all parameters are required
            if (!upiIntent || !featureName) {
                console.log('%c << 🤖>> upiIntent or featureName parameters must be required', 'color: red; font-weight: bold;', 'openPSPModal', 'upiIntent', upiIntent, 'featureName', featureName);
                reject('Native callback failed');
                return;
            }
            
            // check all parameters types
            if (typeof upiIntent !== TYPE_STRING || typeof featureName !== TYPE_STRING) {
                console.log('%c << 🤖>> upiIntent or featureName parameters type must be a string', 'color: red; font-weight: bold;', 'openPSPModal', 'typeof upiIntent', typeof upiIntent, 'typeof featureName', typeof featureName);
                reject('Native callback failed');
                return;
            }

            if (!this.nativeSupport) {
                reject('Native callback failed');
                return;
            }

            window.callBackPSPDialogInfo = (status, upiProgress) => {
                if (status) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackPSPDialogInfo', status);
                    
                    if (upiProgress === PSP_MODAL_STATUS.PAYMENT_COMPLETED) {
                        resolve(upiProgress);
                    } else if (upiProgress === PSP_MODAL_STATUS.MODAL_CALOSED) {
                        reject(upiProgress);
                    }
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackPSPDialogInfo', status);
                    reject(upiProgress);
                }
            };

            const payload = renderParams({ "key": nativeKeyMap.PSP_MODAL, upi_intent: upiIntent, feature_name: featureName });
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openPSPModal', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

      /**
     * @name share screenshot
     * @description Handles the native communication to share screenshot via all apps and whatsapp
     */
    _callBackShareScreenshot(shareParams){
        if (!this.nativeSupport) return;
        return new Promise((resolve, reject) => {
            window.callBackShareScreenShot = (success, error, data) => {
                if(data){
                    resolve(data);
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackShareScreenshot', data);
                    reject("Invalid data");
                }
            }

            const payload = renderParams({ "key": nativeKeyMap.SHARE_SCREENSHOT, ...shareParams })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'shareScreenshot', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name share _getSimBindingData
     * @description get device information like (device_id, install_id, sim_numbers)
     */
    _getSimBindingData(){
        if (!this.nativeSupport) Promise.reject();
        return new Promise((resolve, reject) => {
            window.callbackPhoneVerificationInfo = (success, data) => {
                if(success){
                    const simInfo = parseParams(data) || {};
                    simInfo.sims = [];

                    /**
                     * covert sim_0, sim_1 to sims Array
                     * support to 4 sim slot
                    */
                    for (let i = 0; i < 4; i++) {
                        if (simInfo[`sim_${i}`]) {
                            simInfo.sims.push(simInfo[`sim_${i}`]);
                            delete simInfo[`sim_${i}`];
                        }
                    }
                    
                    resolve(simInfo);
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callbackPhoneVerificationInfo', data);
                    reject(data);
                }
            }
            const payload = renderParams({ "key": nativeKeyMap.SIM_DATA })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'getSimBindingData', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name share _openSimBindingDeepLink
     * @description open SIM binding deep link
     */
    _openSimBindingDeepLink(link){
        if (!this.nativeSupport) Promise.reject();
        return new Promise((resolve) => {
            window.callbackOnFeedbackResult = () => {
                resolve();
            }

            const payload = renderParams({ "key": nativeKeyMap.OPEN_SIM_BINDING_LINK, deeplink: link })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openSimBindingDeepLink', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name share _openBiometric
     * @description open mobile biometric screen locker
     */
    _openBiometric(title, description){
        if (!this.nativeSupport) Promise.reject();
        return new Promise((resolve, reject) => {
            window.callbackAuthenticateApp = (flag, data) => {
                if (flag) {
                    resolve(data);
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callbackAuthenticateApp', data);
                    reject(data);
                }
            }

            const payload = renderParams({ "key": nativeKeyMap.OPEN_BIOMETRIC, title, description })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openBiometric', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name _shareDownloadableLink
     * @description share downloadable link via whats app, email etc.
     */
    _shareDownloadableLink(url, type = 'application/pdf', fileName = getFileName(), shareOn = 'otherApp'){
        if (!this.nativeSupport) Promise.reject();

        // check url param is non-empty and must be string type
        if (!url || typeof url !== 'string') {
            console.log('%c << 🤖>> downloadable link must be required as string type', 'color: red; font-weight: bold;', 'shareDownloadableLink', 'url', url);
            return Promise.reject()
        }
        
        return new Promise((resolve, reject) => {
            window.callbackSharePdf = (isShared) => {
                if (isShared) {
                    resolve();
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callbackSharePdf', 'isShared', isShared);
                    reject();
                }
            }

            const payload = renderParams({ "key": nativeKeyMap.SHARE_DOWNLOADABLE_LINK, url, type, fileName, shareOn })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'shareDownloadableLink', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name _subscribeBackButton
     * @description back button subscription.
     */
    _subscribeBackButton(){
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.callbackOnSubscribeBackButton = isSubscribed => {
                if (isSubscribed) {
                    resolve(isSubscribed);
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'Back button subscription failed', 'isSubscribed', isSubscribed);
                    reject();
                }
            }

            const payload = renderParams({ "key": nativeKeyMap.SUBSCRIBE_BACK_BUTTON, "subscribeBack": true })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Subscribe back button', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @function _subscribeBackPress
     * @description return native back button press
     */
    _subscribeBackPress(successCallback, failureCallback) {
        this._subscribeBackButton().then((isSubscribed) => {
            if (isSubscribed) {
                setObjectProp(window.__proto__, 'callbackSubscribeBackPressed', successCallback);
            }
        }).catch(failureCallback);
    }

    /**
     * @function _overrideBackPress
     * @description override back button default functionality
     */
    _overrideBackPress(callbackFn) {
        // check is back button subscribed or not
        if (!('callbackSubscribeBackPressed' in window)) {
            console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'BackButtonNotSubscribed Error - use subscribeBackPress method first then try to override');
            return;
        }

        window.callbackSubscribeBackPressed = callbackFn;
        // return closer function so that reset override function and recall global function
        return function() {
            delete window.callbackSubscribeBackPressed;
        };
    }


     /**
     * @name _initAutoReadOTP
     * @description will init the auto read and will return the appSign
     */
    _initOTPAutoRead(lapseTime){
        if (!this.nativeSupport) Promise.reject();
        
        return new Promise((resolve) => {
            window.callbackAppsignForInitOtpAutoread = appSign => resolve(appSign);
            const payload = renderParams({ "key": nativeKeyMap.INIT_OTP_AUTOREAD, lapseTime})
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'autoReadOTP', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

       /**
     * @name _callbackAutoReadOTP
     * @description will call callback for auto SMS read
     */
    _callbackAutoReadOTP(){
        return new Promise((resolve, reject) => {
            window.callbackOtpSuccess = otp => resolve(otp);
            window.callbackOtpError = error => reject(error);
            window.callbackOtpAutoreadTimeout = () => reject();
            console.log('%c << 🤖>> Triggering callbackAutoRead ✅ ✅', 'color: orange; font-weight: bold;', 'callbackautoReadOTP');
        });
    }

    /**
     * @name callBackHomeFeedRefresh
     * @description Handles the native communication to Refresh Home Feed
     */
    _callBackHomeFeedRefresh (apiCodes = []) {
           if (!Array.isArray(apiCodes)) {
               console.log('%c << 🤖>> apiCodes type must be an array', 'color: red; font-weight: bold;', 'homeFeedRefresh', 'Array.isArray(apiCodes):', Array.isArray(apiCodes));
               return;
           }

           if (!this.nativeSupport) return;
   
           const payload = renderParams({ "key": nativeKeyMap.REFRESH_HOME_FEED, apiCodes });
           console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'homeFeedRefresh', payload);
           window.androidObj.nativeSupport(payload);
    }

     /**
     * @name initSmsSync
     * @description initialize sms Sync
     */
    _initSmsSync(){
        if (!this.nativeSupport) return;
   
        const payload = renderParams({ "key": nativeKeyMap.INIT_SMS_SYNC });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'initSmsSync', payload);
        window.androidObj.nativeSupport(payload);
    }

     /**
     * @name callBackOnSubscribeSms
     * @description Handles Subscribe Sms Sync
     */
    _callBackOnSubscribeSmsSync () {
        if (!this.nativeSupport) return;
        return new Promise((resolve, reject) => {
            window.callbackOnSubscribeSmsSync = (isDataSynced , message) => {
                if (isDataSynced) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackOnSubscribeSmsSync', isDataSynced , 'message' , message);
                    resolve(message);
                } 
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackOnSubscribeSmsSync' , message);
                    reject();
                }
            };

           const payload = renderParams({ "key": nativeKeyMapLegacy.SUBSCRIBE_SMS_SYNC})
           console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', '_callBackOnSubscribeSms', payload);
           window.androidObj.nativeSupport(payload);
        })
   }
}

export default NativeInterface