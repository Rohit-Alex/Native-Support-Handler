import { _isNativeActivated, _setAndroidClass } from './helpers'

/**
 * @name _init
 * @description Injects & checks for support key which is getting injected from Native
 */
const _init = (legacy = false) => {
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, _) => {
        _setAndroidClass()
        const checkNativeSupport = setInterval(() => {
            console.log('%c << 🤖>> Checking native capability', 'color: blue; font-weight: bold;');
            if (_isNativeActivated()) {
                const versionInfo = legacy ? 'V1 legacy' : 'V2';
                console.log('%c << 🤖>> Native integration successfull ✅ ✅ ✅ ✅ ✅ ', 'color: blue; font-weight: bold;');
                console.log(`%c << 🤖>> Using version ${versionInfo} `, 'color: blue; font-weight: bold;');
                clearInterval(checkNativeSupport)
                resolve(true)
            }
        }, 500)
    })
}

/**
 * @name _initUDP
 * @description Like UDP it never waits for the response, It just straight away initializes
 */
const _initUDP = (legacy = false) => {
    // eslint-disable-next-line no-unused-vars
    _setAndroidClass();
    console.log('%c << 🤖>> Native method injected ✅ ✅ ✅ ✅ ✅ ', 'color: blue; font-weight: bold;')
}

export {
    _init,
    _initUDP
}