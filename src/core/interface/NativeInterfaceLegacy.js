
import { nativeKeyMapLegacy, TYPE_STRING, PSP_MODAL_STATUS, PERMISSIONS_KEYS } from '../constants'
import { renderParams, _isNativeActivated, parseParams, getFileName, setObjectProp, getURLParameter } from '../helpers'


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
    _callBackClosed() {
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.CLOSE_WEBVIEW })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackClosed', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackCamera
     * @description Handles the native communication to open the front/back camera and recevices the base64 image
     * @param {boolean} front 
     */
    _callBackCamera(front) {
        return new Promise((resolve, reject) => {
            window.callBackCamera = (success, error, data) => {
                if (success) {
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

            const payload = renderParams({ "key": (front) ? nativeKeyMapLegacy.FRONT_CAMERA : nativeKeyMapLegacy.BACK_CAMERA })

            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackCamera', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackScanner
     * @description Handles the native communication to call & receive scanner Data
     */
    _callBackScanner() {
        return new Promise((resolve, reject) => {
            window.callBackScanner = (success, error, data) => {
                if (success) {
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.SCANNER })

            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackScanner', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackAppInfo
     * @description Handles the native communication to call & receive app info
     */
    _callBackAppInfo() {
        return new Promise((resolve, reject) => {
            window.callBackappInfo = (success, data) => {
                if (success) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackAppInfo', data);
                    resolve(data);
                }
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackAppInfo', data);
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.APP_INFO })

            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackAppInfo', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name callBackAppInfo
     * @description Handles the native communication to call & receive app info
     */
    _fetchToken() {
        return new Promise((resolve, reject) => {
            window.callBackappInfo = (success, data) => {
                if (success && data) {
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
    _callBackLocation() {
        return new Promise((resolve, reject) => {

            window.callBackLocationAccess = (success, error, data) => {
                if (success) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackLocationAccess', data);
                    resolve(data);
                }
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackLocationAccess', data);
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.FETCH_GEOLOCATION })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callBackLocationAccess', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name openDeeplink
     * @description Handles the native communication to open deeplink
     */
    _openDeeplink(deeplink) {
        if (!this.nativeSupport) return;

        window.callBackDeeplink = res => {
            console.log("Deeplink", res)
        }
        const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_DEEPLINK, deeplink })
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openDeepLink', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name openUrl
     * @description Handles the native communication to open url
     */
    _openUrl(url) {
        if (!this.nativeSupport) return;
        const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_URL, url })
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openUrl', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name cleverTrackEvent
     * @description Handles the native communication to register Clever Track Events
     */
    _cleverTrackEvent(event = '', eventParams = {}) {

        if (typeof eventParams !== 'object') {
            console.log('%c << 🤖>> eventParams type must be an object', 'color: red; font-weight: bold;', 'cleverTrackEvent', 'typeof eventParams', typeof eventParams);
            return;
        }

        if (!this.nativeSupport) return;

        const payload = renderParams({ "key": nativeKeyMapLegacy.CLEVER_TRACK, event, event_params: eventParams });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'cleverTrackEvent', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name openPSPModal
     * @description Handles the PSP MOdal and sends a callback
     */
    _openPSPModal(upiIntent, featureName) {

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

            const payload = renderParams({ "key": nativeKeyMapLegacy.PSP_MODAL, upi_intent: upiIntent, feature_name: featureName });

            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openPSPModal', payload);
            window.androidObj.nativeSupport(payload);
        })
    }

    /**
     * @name share screenshot
     * @description Handles the native communication to share screenshot via all apps and whatsapp
     */
    _callBackShareScreenshot(shareParams) {
        if (!this.nativeSupport) return;
        return new Promise((resolve, reject) => {
            window.callBackShareScreenShot = (success, error, data) => {
                if (data) {
                    resolve(data);
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackShareScreenshot', data);
                    reject("Invalid data");
                }
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.SHARE_SCREENSHOT, ...shareParams })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'shareScreenshot', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name share _getSimBindingData
     * @description get device information like (device_id, install_id, sim_numbers)
     */
    _getSimBindingData() {
        if (!this.nativeSupport) Promise.reject();
        return new Promise((resolve, reject) => {
            window.callbackPhoneVerificationInfo = (success, data) => {
                if (success) {
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
            const payload = renderParams({ "key": nativeKeyMapLegacy.SIM_DATA })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'getSimBindingData', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name share _openSimBindingDeepLink
     * @description open SIM binding deep link
     */
    _openSimBindingDeepLink(link) {
        if (!this.nativeSupport) Promise.reject();
        return new Promise((resolve) => {
            window.callbackOnFeedbackResult = () => {
                resolve();
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_SIM_BINDING_LINK, deeplink: link })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openSimBindingDeepLink', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name share _openBiometric
     * @description open mobile biometric screen locker
     */
    _openBiometric(title, description) {
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_BIOMETRIC, title, description })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'openBiometric', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name _shareDownloadableLink
     * @description share downloadable link via whats app, email etc.
     */
    _shareDownloadableLink(url, type = 'application/pdf', fileName = getFileName(), shareOn = 'otherApp') {
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.SHARE_DOWNLOADABLE_LINK, url, type, fileName, shareOn })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'shareDownloadableLink', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name _subscribeBackButton
     * @description back button subscription.
     */
    _subscribeBackButton() {
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

            const payload = renderParams({ "key": nativeKeyMapLegacy.SUBSCRIBE_BACK_BUTTON, "subscribeBack": true })
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
        return function () {
            delete window.callbackSubscribeBackPressed;
        };
    }

    /**
    * @name _initAutoReadOTP
    * @description will init the auto read and will return the appSign
    */
    _initOTPAutoRead(lapseTime) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve) => {
            window.callbackAppsignForInitOtpAutoread = appSign => resolve(appSign);
            const payload = renderParams({ "key": nativeKeyMapLegacy.INIT_OTP_AUTOREAD, lapseTime })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'autoReadOTP', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
  * @name _callbackAutoReadOTP
  * @description will call callback for auto SMS read
  */
    _callbackAutoReadOTP() {
        return new Promise((resolve, reject) => {
            window.callbackOtpSuccess = otp => resolve(otp);
            window.callbackOtpError = error => reject(error);
            window.callbackOtpAutoreadTimeout = () => reject();
            console.log('%c << 🤖>> Triggering callbackAutoRead ✅ ✅', 'color: orange; font-weight: bold;', 'callbackautoReadOTP');
        });
    }

    /**
     * @name callBackHomeFeedRefresh
     * @description will refresh the home feed
     */
    _callBackHomeFeedRefresh(apiCodes = []) {
        if (!Array.isArray(apiCodes)) {
            console.log('%c << 🤖>> apiCodes type must be an array', 'color: red; font-weight: bold;', 'homeFeedRefresh', 'Array.isArray(apiCodes):', Array.isArray(apiCodes));
            return;
        }

        if (!this.nativeSupport) return;

        const payload = renderParams({ "key": nativeKeyMapLegacy.REFRESH_HOME_FEED, apiCodes });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'homeFeedRefresh', payload);
        window.androidObj.nativeSupport(payload);
    }

    _callbackFileRequestFromGallery() {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.callbackFileSuccess = fileContent => {
                if (fileContent) {
                    resolve(fileContent);
                } else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'Image selection from gallery is failed', 'fileContent', fileContent);
                    reject();
                }
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.REQUEST_IMAGE })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Image access request from gallery', payload);
            window.androidObj.nativeSupport(payload);
        });
    }


    _callbackShareWhatsapp(url = "", text = "", type = "image") {
        if (!this.nativeSupport) Promise.reject();
        if (!url) {
            console.log('%c << 🤖>> Url is missing for sharing via whatsapp', 'color: red; font-weight: bold;', 'whatsapp sharing');
            return;
        }

        return new Promise((resolve, reject) => {
            window.callbackWhatsAppShareSuccess = () => {
                resolve();
            }
            window.callbackWhatsAppShareFailed = (error) => {
                console.log('%c << 🤖>>Sharing via whatsapp failed', 'color: red; font-weight: bold;');
                reject(error);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.SHARE_URL_ON_WHATSAPP, url, text, type })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Sharing image url via whatsapp', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _callbackShareViaOthers(url = "", text = "") {
        if (!this.nativeSupport) Promise.reject();
        if (!url) {
            console.log('%c << 🤖>> Image url is missing for sharing via other', 'color: red; font-weight: bold;', 'sharing via other apps');
            return;
        }

        return new Promise((resolve, reject) => {
            window.callbackOtherAppShareSuccess = () => {
                console.log("%c << 🤖>> other app success");
                resolve();
            }
            window.callbackOtherAppShareFailed = (error) => {
                console.log('%c << 🤖>>Sharing via others app failed', 'color: red; font-weight: bold;');
                reject(error);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.SHARE_URL_ON_OTHERS, url, text })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Sharing image url via other apps', payload);
            window.androidObj.nativeSupport(payload);
        });
    }


    /**
      * @name _callbackDownloadImage
      * @description download image to device
    */
    _callbackDownloadImage(url = "", type = "") {
        if (!this.nativeSupport) Promise.reject();
        if (!url) {
            console.log('%c << 🤖>> Image url is missing for downloading', 'color: red; font-weight: bold;', 'Downloading image to device');
            return;
        }
        return new Promise((resolve, reject) => {
            window.callbackDownloadImage = (isDownloaded) => {
                if (isDownloaded) {
                    console.log('%c << 🤖>> download successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'downloadImage Success', status);
                    resolve();
                } else {
                    console.log('%c << 🤖>> Download failed', 'color: red; font-weight: bold;', 'callbackDownloadImage', status);
                    reject(upiProgress);
                }
            };

            const payload = renderParams({ "key": nativeKeyMapLegacy.DOWNLOAD_IMAGE, url, type });

            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'callbackDownloadImage', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _callbackGetContactsList() {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.callBackContactInfo = (success, error, data) => {
                console.log("%c << 🤖>> get contacts info success", success, data);
                if (success) resolve(data);
                reject(error);
            }
            window.callbackPermissionFailure = (error) => {
                console.log('%c << 🤖>>Fetching user contacts info failure', 'color: red; font-weight: bold;');
                reject(error);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.CONTACTS_INFO })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Fetching user contacts info', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _openSMS(contactNumber = "", message = "") {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.callbackMessageSent = () => {
                console.log("%c << 🤖>> send sms success");
                resolve();
            }
            window.callbackMessageFailed = (error) => {
                console.log('%c << 🤖>>Sending sms failure', 'color: red; font-weight: bold;', "error", error);
                reject(error);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.SEND_SMS, contactNumber, message })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Open Send SMS View', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name SmsSync
     * @description 
     */
    _initSmsSync() {
        if (!this.nativeSupport) return;

        const payload = renderParams({ "key": nativeKeyMapLegacy.INIT_SMS_SYNC });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'initSmsSync', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
    * @name callBackOnSubscribeSms
    * @description Handles Subscribe Sms Sync
    */
    _callBackOnSubscribeSmsSync() {
        if (!this.nativeSupport) return;
        return new Promise((resolve, reject) => {
            window.callbackOnSubscribeSmsSync = (isDataSynced, message) => {
                if (isDataSynced) {
                    console.log('%c << 🤖>> Action successfull ✅ ✅ ✅ ✅ ✅', 'color: white; font-weight: bold;', 'callBackOnSubscribeSmsSync', isDataSynced, 'message', message);
                    resolve(message);
                }
                else {
                    console.log('%c << 🤖>> Action failed', 'color: red; font-weight: bold;', 'callBackOnSubscribeSmsSync', isDataSynced, message);
                    reject();
                }
            };

            const payload = renderParams({ "key": nativeKeyMapLegacy.SUBSCRIBE_SMS_SYNC })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', '_callBackOnSubscribeSms', payload);
            window.androidObj.nativeSupport(payload);
        })
    }


    _openDialer(mobile) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.onOpenDialerSuccess = () => {
                console.log("%c << 🤖>> Dialer opened success");
                resolve();
            }
            window.onOpenDialerError = (error) => {
                console.log('%c << 🤖>>Opening dialer failure', 'color: red; font-weight: bold;', "error", error);
                reject(error);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_DIALER, mobile })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Open Dialer View', payload);
            window.androidObj.nativeSupport(payload);
        });
    }


    _openMap(latitude = '', longitude = '', zoom = '', label = '', address = '') {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.onOpenMapSuccess = () => {
                console.log("%c << 🤖>> map opened success");
                resolve();
            }
            window.onOpenMapError = (error) => {
                console.log('%c << 🤖>>Opening map failure', 'color: red; font-weight: bold;', "error", error);
                reject(error);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_MAP, latitude, longitude, zoom, label, address })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Open Map View', payload);
            window.androidObj.nativeSupport(payload);
        });
    }


    _showLoader(is_retry) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise(resolve => {
            const payload = renderParams({ "key": nativeKeyMapLegacy.SHOW_LOADER, is_retry })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Show loader', payload);
            window.androidObj.nativeSupport(payload);
            resolve();
        });
    }

    _hideLoader() {
        if (!this.nativeSupport) Promise.reject();

        return new Promise(resolve => {
            const payload = renderParams({ "key": nativeKeyMapLegacy.HIDE_LOADER })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Hide loader', payload);
            window.androidObj.nativeSupport(payload);
            resolve();
        });
    }

    _getAndroidPermissions(permissions) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.onSubscribePermissionCallback = (success) => {
                if (success) {
                    console.log("%c << 🤖>> Get android permissions success");
                    resolve();
                } else {
                    console.log("%c << 🤖>> Get android permissions failure");
                    reject();
                }
            }

            let keys = permissions.map(perm => PERMISSIONS_KEYS[perm]);

            const payload = renderParams({ "key": nativeKeyMapLegacy.ANDROID_PERMISSIONS, permissions: keys })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Get android permissions', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _shareByteArrayOrLinkToOtherApps(isUrl, data) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.callBackShare = (success, error, isShared) => {
                if (isShared.toLowerCase() === "success") {
                    console.log("%c << 🤖>> Sharing image as link or byte Array success");
                    resolve();
                } else {
                    console.log("%c << 🤖>> Sharing image as link or byte Array failed");
                    reject();
                }
            }
            let key = isUrl ? 'url' : 'byteArray';
            const payload = renderParams({ "key": nativeKeyMapLegacy.SHARE_BYTE_OR_LINK, [key]: data })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Sharing image as link or byte Array', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _openPOSScanner(type) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.onPosScannerSuccess = result => {
                console.log("%c << 🤖>> POS Scanner success");
                resolve(result);
            }

            window.onPosScannerError = error => {
                console.log("%c << 🤖>> POS Scanner failed");
                reject(error);
            }


            const payload = renderParams({ "key": nativeKeyMapLegacy.POS_SCANNER, type })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'POS SCANNER', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _shareBranchLink(channel, message, link_only) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise(resolve => {
            if (link_only) {
                window.callBackBranchReferralLink = (link) => {
                    console.log("%c << 🤖>> Sharing only branch link", link);
                    resolve(link);
                }
            } else {
                window.callBackBranchReferral = (hasShared) => {
                    console.log("%c << 🤖>> Sharing branch link via apps", hasShared);
                    resolve(hasShared);
                }
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.BRANCH_SHARE_LINK, channel, message, link_only })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Sharing branch link', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _shareAppsFlyerLink(channel, message, link_only) {
        if (!this.nativeSupport) Promise.reject();

        return new Promise(resolve => {
            if (link_only) {
                window.callBackAppsflyerReferralLink = (link) => {
                    console.log("%c << 🤖>> Sharing apps flyer link only", link);
                    resolve(link);
                }
            } else {
                window.callBackAppsflyerReferral = (hasShared) => {
                    console.log("%c << 🤖>> Sharing apps flyer link via apps", hasShared);
                    resolve(hasShared);
                }
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.APPSFLYER_SHARE_LINK, channel, message, link_only })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Sharing branch link', payload);
            window.androidObj.nativeSupport(payload);
        });
    }
    _logOut(){
        if (!this.nativeSupport) return;
   
        const payload = renderParams({ "key": nativeKeyMapLegacy.LOG_OUT });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'logout successful', payload);
        window.androidObj.nativeSupport(payload);
    }
    _onAudioAlertStatusCallback() {
        if(!this.nativeSupport)Promise.reject();

        return new Promise((resolve) => {
            window.onAudioAlertStatusCallback = (status) => {
                console.log("%c << 🤖>> Audio alert status", status);
                resolve(status);
            };
            const payload = renderParams({"key": nativeKeyMapLegacy.AUDIO_ALERT_STATUS});
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;');
            window.androidObj.nativeSupport(payload);
        });
    }
    _changeAudioAlert(isTtsEnable) {
        if(!this.nativeSupport)Promise.reject();
            const payload = renderParams({"key": nativeKeyMapLegacy.SET_AUDIO_ALERT, isTtsEnable})
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Audio alert set', isTtsEnable);
            window.androidObj.nativeSupport(payload);
    }
    _checkPermissionStatus(permissions) {
        if (!this.nativeSupport) Promise.reject();
        if (permissions && permissions.length === 0) {
            console.log("No permissions provided");
            Promise.reject("No permissions provided");
        }

        return new Promise(resolve => {
            window.onCheckPermissionsStatus = result => {
                console.log("%c << 🤖>> Check permissions success");
                resolve(result);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.CHECK_PERMISSIONS_STATUS, permissions })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Fetching permission status', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _requestPermissions(permissions) {
        if (!this.nativeSupport) Promise.reject();
        if (permissions && permissions.length === 0) {
            console.log("No permissions provided");
            Promise.reject("No permissions provided");
        }

        return new Promise(resolve => {
            window.onCheckPermissionsStatus = result => {
                console.log("%c << 🤖>> Request permissions success");
                resolve(result);
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.REQUEST_PERMISSIONS, permissions })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Requesting permissions', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    _openAppSettings() {
        if (!this.nativeSupport) Promise.reject();
        return new Promise(resolve => {
            window.callBackOpenAppSettings = () => {
                console.log("%c << 🤖>> App settings closed. Back to main application.");
                resolve();
            }

            const payload = renderParams({ "key": nativeKeyMapLegacy.OPEN_APP_SETTINGS })
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'Requesting open App Settings', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

    /**
     * @name triggerLendingFunnel
     * @description 
     */
    _triggerPLotlineFunnel() {
        if (!this.nativeSupport) return;

        const payload = renderParams({ "key": nativeKeyMapLegacy.TRIGGER_PLOTLINE_FUNNEL });
        console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'triggerPLotlineFunnel', payload);
        window.androidObj.nativeSupport(payload);
    }

    /**
     * @name nativeFileUpload
     * @description 
     */

    _nativeFileUpload(){
        if (!this.nativeSupport) Promise.reject();

        return new Promise((resolve, reject) => {
            window.onRequestAnyFileSuccess = (fileName, base64) => {
                resolve({
                    fileName,
                    content: base64,
                });
            };
    
            window.onRequestAnyFileError = (error) => {
                reject(error);
            };

            const payload = renderParams({ "key": nativeKeyMapLegacy.FILE_REQUEST });
            console.log('%c << 🤖>> Triggering nativeSupport ✅ ✅', 'color: orange; font-weight: bold;', 'nativeFileRequest', payload);
            window.androidObj.nativeSupport(payload);
        });
    }

}


export default NativeInterface