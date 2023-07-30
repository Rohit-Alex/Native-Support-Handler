import  {
    ANDROID_OBJ,
    NATIVE_SUPPORT_KEY,
    TYPE_FUNCTION,
    TYPE_STRING
} from './constants'

/**
 * @name _setAndroidClass
 * @description Set AndroidClass in window object for native injection
 */
const _setAndroidClass = () => {
    if (!_isAFunction(window.androidObj)) {
        window.androidObj = function AndroidClass(){};
        sessionStorage.setItem(ANDROID_OBJ, window.androidObj); 
    }
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
 * @name _isAFunction
 * @description Function validator
 * @param {*} item 
 */
const _isAFunction = (item) => typeof item === TYPE_FUNCTION


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
 * @name getFileName
 * @description get default file name
 */
const getFileName = () => {
    const dateObj = new Date();
    const fileName = `${dateObj.getDate()}_${dateObj.getMonth()}_${dateObj.getFullYear()}(${dateObj.getHours()}:${dateObj.getMinutes()}).pdf`;
    return fileName;
}

/**
 * @function setObjectProp
 * @param {object} sourceObj 
 * @param {string} key 
 * @param {any} value 
 * @param {boolean} writable 
 * @param {boolean} enumerable 
 * @param {boolean} configurable
 * @description set property of an object with configuration
 */
const setObjectProp = (sourceObj, key, value, writable = true, enumerable = true, configurable = true) => {
    Object.defineProperty(sourceObj, key, {
        value,
        configurable,
        enumerable,
        writable,
    })
}

/**
 * 
 * @param {*} qrString 
 * @param {*} paramName 
 * @returns 
 */
const getURLParameter = (qrString, paramName) => {
	const qr = qrString.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp(`[\\?&]${paramName}=([^&#]*)`);
	const results = regex.exec(qr);

	return results && results.length > 0 ? decodeURIComponent(results[1].replace(/\+/g, ' ')) : '';
};


export {
    _setAndroidClass,
    _isAFunction,
    _isNativeActivated,
    renderParams,
    parseParams,
    getFileName,
    setObjectProp,
    getURLParameter,
}