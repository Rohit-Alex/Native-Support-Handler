declare namespace NativeSupportHandler {
  // share screenshot parameters interface
  interface ScreenShotParamsInterface {
    type?: string;
    message?: string;
    screenName: string;
  }

  // interface of SIM binding response
  interface SimBindingDataInterface {
    install_id: string;
    device_id: string;
    sims?: Array<{
      slot: string;
      sim_id: string;
      carrier_name: string;
      phone: string;
    }>;
  }

  interface ConstantsInterface {
    REFRESH_USER_INFO: number;
    REFRESH_UPI_TRANSACTION: number;
    REFRESH_SETTLEMENTS: number;
    REFRESH_BP_CARD_DETAILS: number;
    REFRESH_DYNAMIC_MENUS: number;
    REFRESH_MESSAGES: number;
    REFRESH_BP_CONFIG_MODEL: number;
    REFRESH_ROUTES: number;
  }

  // Native Support Handler base interface
  interface NativeSupportHandlerInterface {
    Constants: ConstantsInterface;
    init(): Promise<boolean>;
    closeWebView(): Promise<string>;
    openDeeplink(link: string): void;
    openFrontCamera(): Promise<string>;
    openBackCamera(): Promise<string>;
    openScanner(): Promise<string>;
    getAppInfo(): Promise<string>;
    getToken(): Promise<string>;
    fetchGeoLocation(): Promise<string>;
    openUrl(url: string): void;
    cleverTrackEvent(event: string, eventParams: object): void;
    openPSPModal(upiIntent: string, featureName: string): Promise<string>;
    shareScreenshot(params: ScreenShotParamsInterface): Promise<string>;
    shareDownloadableLink(
      url: string,
      type: string,
      fileName: string,
      shareOn: string
    ): Promise<string>;
    getSimBindingData(): Promise<SimBindingDataInterface>;
    openSimBindingDeepLink(link: string): Promise<string>;
    openBiometric(title: string, description: string): Promise<string>;
    subscribeBackPress(
      backPressCallback: CallableFunction,
      failureCallback: CallableFunction
    ): void;
    overrideBackPress(backPressCallback: CallableFunction): Function;
    initAutoRead(lapseTime: number): Promise<string>;
    callbackAutoReadOTP(): Promise<string>;
    homeFeedRefresh(apiCodes: Array<number>): void;
    initSmsSync(): void;
    callbackGetContactsList(): Promise<any>;
    checkPermissionStatus(permissions: Array<string> | Array<number>): Promise<any>;
    requestPermissions(permissions: Array<string> | Array<number>): Promise<any>;
    callBackOnSubscribeSmsSync(): void;
    callbackShareViaWhatsapp(url: string, text: string, type:string): Promise<string>;
    callbackShareViaOthers(url: string, text: string): Promise<string>;
    downloadImage(url: string, text: string): Promise<string>;
    logOut(): void;
    onAudioAlertStatusCallback(): Promise<boolean>;
    setAudioAlertStatus(isTtsEnable: boolean): void;
    openAppSettings(): Promise<void>;
    triggerPLotlineFunnel(): Promise<void>;
    nativeFileUpload(): Promise<string, string>,
  }

  // Native Support Handler V2 Interface
  interface NativeSupportHandlerV2Interface
    extends NativeSupportHandlerInterface {
    // declare Native support handler V2 specific methods
      initImmediate(): Promise<boolean>;
      isNativeInitialized(): boolean;
  }

  // Native Support Handler legacy Interface
  interface NativeSupportHandlerLegacyInterface
    extends NativeSupportHandlerInterface {
      initImmediate(): Promise<boolean>;
      isNativeInitialized(): boolean;
    // declare Native support handler legacy specific methods
  }

  export let NativeSupportHandlerV2: NativeSupportHandlerV2Interface;
  export let NativeSupportHandlerLegacy: NativeSupportHandlerLegacyInterface;
}
export = NativeSupportHandler;
export as namespace NativeSupportHandler;
