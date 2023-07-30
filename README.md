# native-support-handler

Internal service which handlers the Native support injection.

## NOTE

- Modules under Merchant App - Should use `NativeSupportHandlerLegacy` for old key mappings.
- All the new modules can use `NativeSupportHandlerV2` (FOS App, Any other etc..)

## Getting Started

Add it to package.json as a dependency

```javascript
General
"native-support-handler": "git+ssh://git@github.com/bharatpe/native-support-handler.git"

With Authtoken
"native-support-handler": "git+https://[AUTH_TOKEN]:x-oauth-basic@github.com/bharatpe/native-support-handler.git"
```

or

```javascript
General
yarn add git+ssh://git@github.com/bharatpe/native-support-handler.git

With Authtoken
yarn add git+https://[AUTH_TOKEN]:x-oauth-basic@github.com/bharatpe/native-support-handler.git
```

---

# KeyMaps - Callbacks (Native Specification)

## This Library is based on this configuration

| Key  | Description                                    | Params                       | Callback                                                                                                                                                                                                                                            |
| ---- | ---------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `1`  | Closing Webview window                         | None                         | window.callBackClosed                                                                                                                                                                                                                               |
| `2`  | To open deeplink                               | deeplink                     | None                                                                                                                                                                                                                                                |
| `3`  | To open front camera                           | None                         | window.callBackCamera                                                                                                                                                                                                                               |
| `4`  | To open back camera                            | None                         | window.callBackCamera                                                                                                                                                                                                                               |
| `5`  | To open scanner                                | None                         | window.callBackScanner                                                                                                                                                                                                                              |
| `6`  | To get app info                                | None                         | window.callBackAppInfo                                                                                                                                                                                                                              |
| `7`  | To get geolocation                             | None                         | window.callBackLocation                                                                                                                                                                                                                             |
| `8`  | To open any url                                | url                          | None                                                                                                                                                                                                                                                |
| `9`  | Register Clever Track event                    | event, eventParams           | None                                                                                                                                                                                                                                                |
| `18` | Share Screenshot via apps                      | shareParams                  | window.callBackShareScreenshot                                                                                                                                                                                                                      |
| `20` | Open Biometric screen locker                   | title, description           | window.callbackAuthenticateApp                                                                                                                                                                                                                      |
| `22` | Open PSP (UPI apps) modal                      | upiIntent, featureName       | window.callBackPSPDialogInfo                                                                                                                                                                                                                        |
| `23` | Get install_id, device_id and SIM data         | None                         | window.callbackPhoneVerificationInfo                                                                                                                                                                                                                |
| `24` | Open SIM binding deep link                     | deeplink                     | window.callbackOnFeedbackResult                                                                                                                                                                                                                     |
| `29` | Share downloadable link via apps               | url, type, fileName, shareOn | window.callbackSharePdf                                                                                                                                                                                                                             |
| `30` | Back button subscription                       | subscribeBack                | window.callbackOnSubscribeBackButton (Once it is successfull, Don't forgot to include window.callbackSubscribeBackPressed in your codebase. So that whenever back button pressed it will get triggered, Therefore you can handle the flow you want) |
| `33` | Init auto read OTP from SMS                    | lapseTime                    | window.callbackAppsignForInitOtpAutoread(this will return appSign, pass that to the otp requesting api, then call NativeSupportHandlerLegacy.callbackAutoReadOTP)                                                                                   |
| NA   | Callbacks for autoread OTP                     |                              | window.callbackOtpSuccess, window.callbackOtpError, window.callbackOtpAutoreadTimeout                                                                                                                                                               |
| `35` | Refresh Home Feed of the App                   | apiCodes                     | None                                                                                                                                                                                                                                      
| `50` | INITIALIZE SMS SYNC                            | None                         | None                                                                                                                                                                                                                                           
| `51` | SUBSCRIBE SMS SYNC                             | None                         | None                                                                                                                                                                                                                                         
| `41` | Open SMS View                                  | number , message             | window.callbackMessageSent, window.callbackMessageFailed                                                                                                                                                                                       
| `42` | Share Image URL on Whatsapp                    | url, text, imageType         | window.callbackWhatsAppShareSuccess, window.callbackWhatsAppShareFailed                                                                                                                                                                       
| `43` | Open Gallery and will return the selected file | number , message             | window.callbackFileSuccess                                                                                                                                                                                                                    
| `44` | Share Image URL via other apps                 | url, text, imageType         | window.callbackOtherAppShareSuccess, window.callbackOtherAppShareFailed                                                                                                                                                                       
| `16` | Get user contact details                       | None                         | window.callBackContactInfo, window.callbackPermissionFailure  
| `47` | Open dialer from mobile                        | Number                       | window.onOpenDialerSuccess , onOpenDialerFailure
| `48` | Open map                                       | lat, long, zoom, label, address | window.onOpenMapSuccess, window.onOpenAddress
| `45` | Show loader                                     | is_retry                       | NULL
| `46` | Hide loader                                     | NONE                           | NULL
| `37` | Android Permissions - Access write external, camera, contacts | [permissions] | window.onSubscribePermissionCallback
| `15` | Share photo as url or byteArray                  | isUrl (true if url otherwise false), data (url or arrayData) | window.callBackShare | Will help in sharing byteArray or url to other apps
| `49` | Open the POS scanner | 0, 1 (optional, 1 for barcode and 0 for QR scanning) | window.onPosScannerSuccess, window.onPosScannerFailed
| `28` | Share the branch link                           | channel, message, link_only(true- only link wil be returned else link as well as open the apps ) | window.callBackBranchReferralLink, window.callBackBranchReferral
| `38` | Share the apps flyer link                      | channel, message, link_only(true- only link wil be returned else link as well as open the apps ) | window.callBackAppsflyerReferralLink, window.callBackAppsflyerReferral
| `58` | Download image to local                        | url                             | NULL
| `53` | Check permission status                        | [permissions](https://developer.android.com/reference/android/Manifest.permission)                 | NULL
| `52` | Request permissions                            | [permissions](https://developer.android.com/reference/android/Manifest.permission)                     | NULL
| `63` | Logout from the App | None             | None  
| `64` | To check audio alert status | None             | window.onAudioAlertStatusCallback 
| `65` | To set audio alert | isTtsEnable             | None

# CommonMethods

| Key | Description         | Params | Description                                              |
| --- | ------------------- | ------ | -------------------------------------------------------- |
| `1` | init                | None   | Promise - Native handshake initializer                   |
| `2` | initImmediate       | None   | Direct injection (UDP format)                            |
| `3` | isNativeInitialized | None   | A simple to check to find is native handshake successful |

---


# API Constants - Key Mapping

| Key | Constant                | Description                    |
| --- | ----------------------- | ------------------------------ |
| `1` | REFRESH_USER_INFO       | Call user info API             |
| `2` | REFRESH_UPI_TRANSACTION | Call UPI transaction list API  |
| `3` | REFRESH_SETTLEMENTS     | Call Settlements API           |
| `4` | REFRESH_BP_CARD_DETAILS | Call BharatPe card details API |
| `5` | REFRESH_DYNAMIC_MENUS   | Call Dynamic Menus API         |
| `6` | REFRESH_MESSAGES        | Call Messages API              |
| `7` | REFRESH_BP_CONFIG_MODEL | Call BharatPe Config Model API |
| `8` | REFRESH_ROUTES          | Call Routes API                |


---

# Usage

## Legacy (Merchant App) | V2 (FOS or any new Apps) (Recommended)

```javascript

import  { NativeSupportHandlerV2, NativeSupportHandlerLegacy  } from 'native-support-handler';


NativeSupportHandlerLegacy.init().then(res => {
  console.log(res); // Native support injection successful
})

// For direct injection
NativeSupportHandlerLegacy.initImmediate()

// For manual check of Native handshake
NativeSupportHandlerLegacy.isNativeInitialized() // True/False

// Example - open Camera
// Always better to have error handling
NativeSupportHandlerLegacy.openBackCamera().then(res => {
  console.log("Base64 Image ---> ", res);
}).catch(err => {
  console.log("Something went bad bro !!", err)
})


// Similar usage for other methods (promise)
NativeSupportHandlerLegacy.openFrontCamera().then( .. )
NativeSupportHandlerLegacy.openScanner().then( .. )
NativeSupportHandlerLegacy.getAppInfo().then( .. )
NativeSupportHandlerLegacy.getToken().then( .. )
NativeSupportHandlerLegacy.fetchGeoLocation().then(.. )
NativeSupportHandlerLegacy.closeWebView().then(... )
NativeSupportHandlerLegacy.openPSPModal('upi://pay?pa=BHARATPE123@bank&pn=Bill+Payment&tn=Pay+To+Bill+Payment&am=1.0', 'Bill Pay').then(...)
NativeSupportHandlerLegacy.shareScreenshot({type?: "WHATSAPP", screenName: "Dashboard", message?: "Hello"}).then(...)
NativeSupportHandlerLegacy.getSimBindingData().then(...)
NativeSupportHandlerLegacy.openSimBindingDeepLink("bharatpe://...").then(...)
NativeSupportHandlerLegacy.openBiometric('Enter screen lock to confirm payment', 'You are paying Rs.[100] from [Interest A/C]').then(...)
NativeSupportHandlerLegacy.shareDownloadableLink('http://mat.uab.cat/~alseda/MasterOpt/MyL09.pdf', 'application/pdf', 'test.pdf', "otherApp/whatsapp").then(...).catch(...)
NativeSupportHandlerLegacy.callBackOnSubscribeSmsSync().then(...)
NativeSupportHandlerLegacy.initSmsSync()
// Direct methods
NativeSupportHandlerLegacy.openDeeplink("ht")
NativeSupportHandlerLegacy.openUrl("http://google.com")
NativeSupportHandlerLegacy.cleverTrackEvent('init', {name: 'BharatPe'})


// Pass all the APIs you need to call in an array as param.

// Check the list of APIs and their constants from the table above.
// If empty/no array passed then 2nd and 4th APIs are called by default.
// Order of the Constants in the array is the order in which APIs are called.
NativeSupportHandlerV2.homeFeedRefresh([
  NativeSupportHandlerV2.Constants.REFRESH_BP_CARD_DETAILS,
  NativeSupportHandlerV2.Constants.REFRESH_MESSAGES,
  NativeSupportHandlerV2.Constants.REFRESH_BP_CONFIG_MODEL,
]);

NativeSupportHandlerLegacy.initAutoRead("90" /*optional*/).then(appSign => {
  //pass this appSign to the requesting api which will send the OTP like below
  initateDeductFromQR(appSign) /*example*/

  //call the below one to get the callbacks for success, error or autoreadtimeout
  NativeSupportHandlerLegacy.callbackAutoReadOTP().then(otp => {
    //set the otp to the input as value like below
    setAutoReadOTP(otp) //example
  });
});

// Back button (RECOMMENDED)
NativeSupportHandlerLegacy.subscribeBackPress(() => {
  if (window.location) {
    if (window.location.hash === '#/') {
      NativeSupportHandlerLegacy.closeWebView();
      return;
    }
  }
  window.history.back();
}, () => {
  // handle error case
});

//Share via whatsapp or others
NativeSupportHandlerLegacy.callbackShareViaWhatsapp(("https://", "Hello Sir", type="image").then(
  () => console.log("Success whatsapp"),
  error =>  console.log(error);
);


NativeSupportHandlerLegacy.callbackShareViaOthers("https://", "Hello Sir").then(
  () => console.log("other app success"),
  error => console.log("other app failed", error)
);

//Download image to local
NativeSupportHandlerLegacy.callbackDownloadImage(("https://", type="image").then(
  () => console.log("Downloaded succesfully"),
  error =>  console.log(error);
);


//Get user contacts
NativeSupportHandlerLegacy.callbackGetContactsList().then((success, error, data) => {
  const contacts = data && JSON.parse(data);
  if (success && contacts.length > 0) {
    console.warn("contacts", contacts);
  } else {
    console.log("Data Not fetched", error);
  }
}, error => {
  console.log(error);
});


  NativeSupportHandlerLegacy.openDialer('7837179723').then(()=>console.log("success"), (err) => console.log(err));
  NativeSupportHandlerLegacy.showLoader(true); //true is whether to show retry or not
  NativeSupportHandlerLegacy.hideLoader();
  NativeSupportHandlerLegacy.openMap('28.5501014', '77.1794768', '2', 'Hello', 'Malviya Nagar').then(...);
  NativeSupportHandlerLegacy.openPosScanner(0).then(...); //type is optional, 1 for barcode scanning and 0 for QR
  NativeSupportHandlerLegacy.shareByteArrayOrLinkToOtherApps(
			true,
			'https://www.google.com/search?q=hello&tbm=isch&ved=2ahUKEwilia7dm6rvAhU5zXMBHV_fDjQQ2-cCegQIABAA&oq=hello&gs_lcp=CgNpbWcQAzIECAAQQzIECAAQQzIHCAAQsQMQQzIECAAQQzIHCAAQsQMQQzICCAAyBQgAELEDMgUIABCxAzIFCAAQsQMyBQgAELEDOggIABCxAxCDAVCuPVjnQWCEQ2gAcAB4AIABiwGIAZMFkgEDMC41mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=NhZLYKWWCLmaz7sP3767oAM&bih=887&biw=1779#imgrc=M6Eb5amowIZAaM',
		);  //where true represents it is a url otherwise it is a byteArray
  NativeSupportHandlerLegacy.getAndroidPermissions([1,2,3,4]).then(...);    //where keys are equivalent to
    // 1: 'android.permissions.ACCESS_FINE_LOCATION',
    // 2: 'android.permissions.WRITE_EXTERNAL_STORAGE',
    // 3: 'android.permissions.CAMERA',
    // 4: 'android.permissions.READ_CONTACTS'

// override subscribeBackPress functionality (Use Case: whenever we need to ask someting from user before route back)
const overrideBackPressRef = NativeSupportHandlerLegacy.overrideBackPress(() => {
  const ask = window.confirm('do you want to close!');
  if (ask) {
    window.history.back();
  }
});

// on component destroy or whenever you don't need more - (DO NOT FORGOT)
overrideBackPressRef();



NativeSupportHandlerLegacy.shareBranchLink('Whatsapp', 'Hello Text', true).then(...); // where 3rd parameter is optional, true represents -> native will only share the link and no param represents native will share the link as well as open apps to share across.

NativeSupportHandlerLegacy.shareAppsflyerLink('Whatsapp', 'Hello Text', true).then(...); // where 3rd parameter is optional, true represents -> native will only share the link and no param represents native will share the link as well as open apps to share across.


// Back button (DEPRECATED)
NativeSupportHandlerLegacy.subscribeBackButton().then( .. ); // Once successful

// Handle something similar as below
// Example : On every native back button press will get this trigged and can manage routing as you want
window.callbackSubscribeBackPressed = () => {
  if (window.location) {
    if (window.location.hash === '#/') {
      NativeSupportHandlerLegacy.closeWebView();
      return;
    }
  }
  window.history.back();
};



// For Any new App use the V2

NativeSupportHandlerV2.openFrontCamera().then( .. ) // Same

//Check permission status
NativeSupportHandlerLegacy.checkPermissionStatus(['CAMERA']).then( .. ); // Once successful

//Request permissions
NativeSupportHandlerLegacy.requestPermissions(['CAMERA']).then( .. ); // Once successful


```

## Callbacks needed

| Action                              | Pramas                                                       | Description                                                                                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `closeWebView`                      | None                                                         | To close the web view                                                                                                                                                                                                                    |
| `openFrontCamera`                   | None                                                         | To open front camera & receive base64 image                                                                                                                                                                                              |
| `openBackCamera`                    | None                                                         | To open back camera & receive base64 image                                                                                                                                                                                               |
| `openScanner`                       | None                                                         | To open QR scanner & receive string                                                                                                                                                                                                      |
| `getAppInfo`                        | None                                                         | Top get app info - mid, token, lat, lng etc                                                                                                                                                                                              |
| `fetchGeoLocation`                  | None                                                         | To reveive geo location information                                                                                                                                                                                                      |
| `openDeeplink`                      | deeplink:string                                              | Open deeplink                                                                                                                                                                                                                            |
| `openUrl CASE`                      | url:string                                                   | Open any external url                                                                                                                                                                                                                    |
| `cleverTrackEvent`                  | event:string, eventParams:object                             | register events to Clever Track                                                                                                                                                                                                          |
| `shareScreenshot`                   | shareParams: object                                          | share screenshot via all or whatsapp                                                                                                                                                                                                     |
| `openPSPModal`                      | upiIntent: string, featureName: string                       | to open PSP modal with returning pregressStatus.\ `SUCCESS_CASE` - USER_CLOSED, PAYMENT_STARTED, PAYMENT_COMPLETED\ `FAILURE_CASE` - INVALID_PARAMS, NO_PSP_INSTALLED                                                                    |
| `getSimBindingData`                 | None                                                         | to get install_id, device_id, SIM data                                                                                                                                                                                                   |
| `openSimBindingDeepLink`            | deeplink: string                                             | to open SIM binding deeplink                                                                                                                                                                                                             |
| `openBiometric`                     | title: string, description: string                           | to open mobile biometric screen locker                                                                                                                                                                                                   |
| `shareDownloadableLink`             | url: string, type: string, fileName: string, shareOn: string | to download file from link then share via apps                                                                                                                                                                                           |
| `subscribeBackButton`               | None                                                         | (DEPRECATED) To control back button from webview                                                                                                                                                                                         |
| `subscribeBackPress`                | successCallback: function, failCallback: function            | (RECOMMENDED) To control back button from webview                                                                                                                                                                                        |
| `overrideBackPress`                 | successCallback: function                                    | override `subscribeBackPress` functionality. This function return a new function to unbind itself. (Note: don't forgot to unbind `overrideBackPress` when component destroy. Otherwise `subscribeBackPress` function never called again) |
| `callbackAppsignForInitOtpAutoread` | lapseTime //optional                                         | To init the OTP SMS auto Read Reader and recieve the appSign and will pass this to api                                                                                                                                                   |
| `callbackOtpSuccess`                | None                                                         | To receive the otp                                                                                                                                                                                                                       |
| `callbackOtpError`                  | None                                                         | To receive error while auto reading the OTP                                                                                                                                                                                              |
| `callbackOtpAutoreadTimeout`        | None                                                         | Otp auto read timeout                                                                                                                                                                                                                    |
| `homeFeedRefresh`                   | apiCodes: Array                                              | To refresh home feed / call APIs selectively on home screen of the app                                                                                                                                                                   |
| `initSmsSync`                       | None                                                         | To Initialize Sms                                                                                                                                                                                                                        |
| `callBackOnSubscribeSmsSync`        | None                                                         | To Subscribe Sms Sync   
|  `homeFeedRefresh`                  | apiCodes: Array                                              | To refresh home feed / call APIs selectively on home screen of the app|
| `downloadImage`                     | successCallback: function, failCallback: function            | (RECOMMENDED) To control action after downloading image
| `checkPermissionStatus`             | successCallback: function                                    | To check permission status 
| `requestPermissions`                | successCallback: function                                    | To request permissions


## Demo

![Sample demo](demo/demoV2.gif)

# --------------------------------------

## Legacy (To support old native communication callbacks, Keys)

# --------------------------------------

```javascript
import { NativeSupportHandlerLegacy } from "native-support-handler";

// Rest all methods were same as V2
```

# --------------------------------------

## V1 (OLD)

# --------------------------------------

```javascript
import { NativeSupportHandler } from "native-support-handler";

NativeSupportHandler.init().then((res) => {
  console.log(res); // Native support injection successful
});

NativeSupportHandler.call(NativeSupportHandler.CLOSE_WEBVIEW); // To close webview
NativeSupportHandler.call(NativeSupportHandler.OPEN_DEEPLINK(deeplink)); // To open specific deeplink
NativeSupportHandler.call(NativeSupportHandler.FRONT_CAMERA); // To open front camera
NativeSupportHandler.call(NativeSupportHandler.BACK_CAMERA); // To open backcamera
NativeSupportHandler.call(NativeSupportHandler.SCANNER); // To open scanner
NativeSupportHandler.call(NativeSupportHandler.APP_INFO); // To fetch app info
NativeSupportHandler.call(NativeSupportHandler.FETCH_GEOLOCATION); // To fetch geolocation
NativeSupportHandler.call(NativeSupportHandler.OPEN_URL(url)); // To open url from native
NativeSupportHandler.call(
  NativeSupportHandler.CLEVER_TRACK_EVENT(event, eventParams)
); // to register Clever Track events
NativeSupportHandler.call(
  NativeSupportHandler.OPEN_PSP_MODAL(upiIntent, featureName)
); // to open PSP (UPI apps) dialog
NativeSupportHandler.call(NativeSupportHandler.SHARE_SCREENSHOT(shareParams));
NativeSupportHandler.call(NativeSupportHandler.GET_SIM_BINDING_DATA()); // to get install_id, device_id, SIM data
NativeSupportHandler.call(
  NativeSupportHandler.OPEN_SIM_BINDING_DEEP_LINK(deeplink)
); // to open SIM binding deep link
NativeSupportHandler.call(
  NativeSupportHandler.OPEN_BIOMETRIC(title, description)
); // to open mobile biometric screen locker
NativeSupportHandler.call(
  NativeSupportHandler.SHARE_DOWNLOADABLE_LINK(url, type, fileName, shareOn)
); // to share file from downloadable link
```

## Callbacks needed

| Action                       | Callbacks                            | Description                                                                                                                                                          |
| ---------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOSE_WEBVIEW`              | window.callBackClosed                | Will receive the close status to this callback form native                                                                                                           |
| `FRONT_CAMERA`               | window.callBackCamera                | Will receive the BASE64 image to this callback form native                                                                                                           |
| `BACK_CAMERA`                | window.callBackCamera                | Will receive the BASE64 image to this callback form native                                                                                                           |
| `SCANNER`                    | window.callBackScanner               | Will receive the scanned data to this callback form native                                                                                                           |
| `APP_INFO`                   | window.callBackAppInfo               | Will receive the app information to this callback form native                                                                                                        |
| `FETCH_GEOLOCATION`          | window.callBackLocation              | Will receive the geolocation data to this callback form native                                                                                                       |
| `FAILURE CASE`               | window.callBackFailure               | Will receive any failure status to this callback                                                                                                                     |
| `SHARE_SCREENSHOT`           | window.callBackShareSreenshot        | Will receive the screenshot of the current page and dialog will open for sharing                                                                                     |
| `OPEN_PSP_MODAL`             | window.callBackPSPDialogInfo         | Will receive the PSP modal callback with STATUS and STATUS_CODE.\ `STATUS_CODE - ` USER_CLOSED, PAYMENT_STARTED, PAYMENT_COMPLETED, INVALID_PARAMS, NO_PSP_INSTALLED |
| `GET_SIM_BINDING_DATA`       | window.callbackPhoneVerificationInfo | Will receive SIM binding data                                                                                                                                        |
| `OPEN_SIM_BINDING_DEEP_LINK` | window.callbackOnFeedbackResult      | Will open SIM binding deeplink                                                                                                                                       |
| `OPEN_BIOMETRIC`             | window.callbackAuthenticateApp       | will open mobile biometric screen locker                                                                                                                             |
| `SHARE_DOWNLOADABLE_LINK`    | window.callbackSharePdf              | will recieve share status true/false                                                                                                                                 |

## Demo

![Sample demo](demo/demo.gif)

## Tip

Place this in componentDidMount for better handling.

## Contributors

Here (https://github.com/bharatpe/native-support-handler/graphs/contributors)

## License

MIT @[bharatpe](#)
