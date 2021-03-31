/*
==================== 工具函數目錄 ====================
String
  將字串內換行符\n轉為<br> -----> nl2br
  取得隨機字串 -----> randomString
  金錢加入千分位逗號 -----> formatNumber
  複製文字至剪貼簿 -----> copyTextToClipboard

Number
  取得範圍內隨機整數 -----> getRandom
  四捨五入到指定位數 -----> round

Image
  預載單張圖片 -----> imageLoaded
  預載多張圖片 -----> imageAllLoaded

Array
  陣列是否有重複值(不分型別) -----> isRepeat
  移除陣列中的重複元素 -----> uniqArray
  二維陣列扁平化(第二參數可指定深度) -----> flatArray
  返回陣列中某值的所有索引 -----> indexOfAll
  兩陣列的交集 -----> intersection
  洗牌陣列 -----> shuffle

Object
  精準型別判斷 -----> typeOf
  過濾物件鍵值 -----> filterObj
  刪除物件鍵值 -----> deleteObj
  深拷貝(簡易版) -----> deepCloneSimple
  深拷貝(完全版) -----> deepClone

Time
  檢查是否為閏年 -----> isLeapYear
  檢查日期是否存在 -----> isExistDate
  返回當前24小時制時間的字符串 -----> getColonTimeFromDate
  返回日期間的天數 -----> getDaysDiffBetweenDates
  檢查是否在某日期後 -----> isAfterDate
  檢查是否在某日期前 -----> isBeforeDate
  返回幾天前後的日期 -----> getDiffDate
  隨機數時間戳 -----> uniqueId
  時間格式化 -----> Date.prototype.format

DOM
  滾動至指定位置 -----> scrollTo
  取得頁面當前捲動高度(寬度) -----> getPageScroll
  取得頁面總高度(寬度) -----> getPage
  取得頁面可視高度(寬度) -----> getPageView

Verify
  各式驗證函式 -----> isRegex
  精準數字驗證 -----> isNumber
  未填入驗證 -----> isEmpty
  身分證驗證 -----> isIdCard

Browser
  取得LocalStorage的值 -----> getLocalStorage
  設定LocalStorage的值 -----> setLocalStorage
  取得Cookie的值 -----> getCookie
  設置cookie值 -----> setCookie
  函式防抖 -----> debounce
  函式節流 -----> throttle

Web
  查詢網址所帶參數 -----> queryString
  解析網址 -----> parseUrl
  網址跳轉 -----> toUrl
  跳頁重整 -----> jumpReload

Device
  判斷是否移動裝置 -----> isMobileUserAgent
  判斷是否蘋果移動裝置 -----> isAppleMobileDevice
  判斷是否安卓移動裝置 -----> isAndroidMobileDevice

*/

// 初始化執行
// cdnBackup();
// Vue.use(VueFormulate);
jumpReload();

//-----------------------String-----------------------
/**
 * 將字串內換行符\n轉為<br>
 * @param  {String} val 傳入值
 * @param  {Boolean} is_xhtml 是否為xhtml
 */
function nl2br(val, is_xhtml = false) {
  if (typeof val === 'undefined' || val === null) {
      return '';
  }
  let breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (val + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

/**
 * 取得隨機字串
 * @param  {Number} length 指定字串長度
 */
function randomString(length = 10) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let temp = "";
  for (let i = 0; i < length; i++) {
    temp += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return temp;
}

/**
 * 數字加入千分位逗號
 * 例：formatNumber(99999) -> 99,999
 * @param  {Number} val 傳入值
 */
function formatNumber(val = 0){
  let temp = val.toString();
  let pattern = /(-?\d+)(\d{3})/;
  while(pattern.test(temp)){
    temp = temp.replace(pattern, "$1,$2");
  }
  return temp;
}

/**
 * 複製文字至剪貼簿
 * @param  {String} id 要複製文字的元素id
 */
function copyTextToClipboard(id) {
  let textRange = document.createRange();
  textRange.selectNode(document.getElementById(id));
  let sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(textRange);
  document.execCommand("copy");
  vm.udAlert({msg: '文字已複製到剪貼簿'});
}

//-----------------------Number-----------------------
/**
 * 取得範圍內隨機整數
 * @param {Number} min 隨機數最小值 預設為0
 * @param {Number} max 隨機數最小值 預設為100
 */
function getRandom(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 四捨五入到指定位數
 * @param  {String} n 代入值 預設為0
 * @param  {Number} decimals 指定位數 預設為0
 * round(1.235, 2); -> 1.24
 */
function round(n = 0, decimals = 0){
  return Number(`${Math.round(`${n}e${decimals}`)}e-${decimals}`);
}

//-----------------------Image-----------------------
/**
 * 預載單張圖片
 * @param  {String} url 圖片路徑
 * imageLoaded('imgUrl').then(...);
 */
function imageLoaded(url) {
  let img = new Image();
  img.src = url;
  return new Promise((resolve, reject) => {
    if(img.complete) {
      resolve(img);
    }else {
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
    }
  })
}

/**
 * 預載多張圖片
 * @param  {Array} arr 多張圖片路徑陣列
 * imageAllLoaded(['imgUrl1','imgUrl2']).then(...);
 */
function imageAllLoaded(arr) {
  let result = [];
  arr.forEach(item => {
    result.push(imageLoaded(item));
  });
  return new Promise((resolve, reject) => {
    Promise.all(result)
      .then(res => resolve(res))
      .catch(err => reject(err));
  })
}

//-----------------------Array-----------------------
/**
 * 陣列是否有重複值(不分型別)
 * @param  {Array} arr 代入值
 */
function isRepeat(arr){
  let obj = {};
  for(let i in arr) {
    if(obj[arr[i]]) return true;
    obj[arr[i]] = true;
  }
  return false;
}

/**
 * 移除陣列中的重複元素
 * @param  {Array} arr 代入值
 */
function uniqArray(arr) {
  let newArr = arr.filter((el, i, arr) => arr.indexOf(el) === i);
  return newArr;
}

/**
 * 二維陣列扁平化(第二參數可指定深度)
 * @param  {Array} arr 代入值
 * @param  {Number} depth 指定深度
 * flatArray([1, [2], 3, 4]); -> [1, 2, 3, 4]
 * flatArray([1, [2, [3, [4, 5], 6], 7], 8], 2); -> [1, 2, 3, [4, 5], 6, 7, 8]
 */
function flatArray(arr, depth = 1){
  return arr.reduce((a, v) => a.concat(depth > 1 && Array.isArray(v) ? flatArray(v, depth - 1) : v), []);
}

/**
 * 返回陣列中某值的所有索引
 * @param  {Array} arr 代入值
 * @param  {Number} val 指定值
 * indexOfAll([1, 2, 3, 1, 2, 3], 1); -> [0,3]
 * indexOfAll([1, 2, 3], 4); -> []
 */
function indexOfAll(arr, val){
  return arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
}

/**
 * 兩陣列的交集
 * @param  {Array} a 陣列A
 * @param  {Array} b 陣列B
 * intersection([1, 2, 3], [4, 3, 2]); -> [2, 3]
 */
function intersection(a, b){
  const s = new Set(b);
  return a.filter(x => s.has(x));
};

/**
 * 洗牌陣列
 * @param  {Array} a 陣列A
 * @param  {Array} b 陣列B
 * shuffle([1, 2, 3]); -> [2, 3, 1];
 */
function shuffle([...arr]){
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

//-----------------------Object-----------------------
/**
 * 精準型別判斷
 * @param  {Any} v 代入值
 */
function typeOf(v){
  return v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();
}

/**
 * 過濾物件鍵值
 * @param  {Object} obj 代入值
 * @param  {Array} arr 過濾值的陣列
 * filterObj(obj,["name","gender"]);
 */
function filterObj(obj, arr){
  let tempObj = JSON.parse(JSON.stringify(obj));
  for(let i in tempObj){
    if(arr.indexOf(i) === -1) delete tempObj[i];
  }
  return tempObj;
}

/**
 * 刪除物件鍵值
 * @param  {Object} obj 代入值
 * @param  {Array} arr 刪除值的陣列
 * deleteObj(test,["name","gender"]);
 */
function deleteObj(obj, arr){
  let tempObj = JSON.parse(JSON.stringify(obj));
  for(let i in tempObj){
    if(arr.indexOf(i) !== -1) delete tempObj[i];
  }
  return tempObj;
}

/**
 * 深拷貝(簡易版)
 * @param  {Object} obj 代入值
 * 無法拷貝特殊類型值與funciton
 */
function deepCloneSimple(obj){
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 深拷貝(完全版)
 * @param  {Object} obj 代入值
 */
function deepClone(obj, hash = new WeakMap()) {
  if(obj == null){
    return obj;
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if(obj instanceof Error) {
    return new Error(obj);
  }
  if(typeof obj !== 'object'){
    return obj;
  }
  if(hash.get(obj)) return hash.get(obj); 
  let cloneObj = new obj.constructor;
  hash.set(obj, cloneObj);
  for(let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key], hash);
    }
  }
  return cloneObj;
}

//-----------------------Time-----------------------
/**
 * 檢查是否為閏年
 * @param  {Number} year 年份
 */
function isLeapYear(year){
  return new Date(year, 1, 29).getDate() === 29;
}

/**
 * 檢查日期是否存在
 * @param  {String} dateStr 日期字串
 * @param  {String} split 分割符 預設為"-"
 * isExistDate("2020-02-29"); -> true
 * isExistDate("2019/02/29","/"); -> false
 */
function isExistDate(dateStr, split = "-") {
  let dateArr = dateStr.split(split);
  let limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let theYear = parseInt(dateArr[0]);
  let theMonth = parseInt(dateArr[1]);
  let theDay = parseInt(dateArr[2]);
  let isLeap = new Date(theYear, 1, 29).getDate() === 29; 
  if (isLeap) limitInMonth[1] = 29;
  return theDay > 0 && theDay <= limitInMonth[theMonth - 1];
}

/**
 * 返回當前24小時制時間的字符串
 * @param  {Any} date 時間物件
 * getColonTimeFromDate(new Date()); -> "08:38:00"
 */
function getColonTimeFromDate(date){
  return date.toTimeString().slice(0, 8);
}

/**
 * 返回日期間的天數
 * @param  {Any} dateInitial 開始時間物件
 * @param  {Any} dateFinal 結束時間物件
 * getDaysDiffBetweenDates(new Date('2019-01-01'), new Date('2019-10-14')); -> 286
 */
function getDaysDiffBetweenDates(dateInitial, dateFinal){
  return (dateFinal - dateInitial) / (1000 * 3600 * 24);
}

/**
 * 檢查是否在某日期後
 * @param  {Any} dateA 時間物件A
 * @param  {Any} dateB 時間物件B
 * isAfterDate(new Date(2010, 10, 21), new Date(2010, 10, 20)); -> true
 */
function isAfterDate(dateA, dateB){
  return dateA > dateB;
}

/**
 * 檢查是否在某日期前
 * @param  {Any} dateA 時間物件A
 * @param  {Any} dateB 時間物件B
 * isBeforeDate(new Date(2010, 10, 20), new Date(2010, 10, 21)); -> true
 */
function isBeforeDate(dateA, dateB){
  return dateA < dateB;
}

/**
 * 返回幾天前後的日期
 * @param  {Number} days 指定天數 可為負值
 * getDiffDate(1); -> "2020-07-01"
 * getDiffDate(0); -> "2020-06-30"
 * getDiffDate(-2); -> "2020-06-28"
 */
function getDiffDate(days){
  let t = new Date();
  t.setDate(t.getDate() + days);
  return t.toISOString().split('T')[0];
};

/**
 * 隨機數時間戳
 */
function uniqueId() {
  return (
    Number(new Date()).toString() + parseInt(10 * Math.random()) + parseInt(10 * Math.random()) + parseInt(10 * Math.random())
  );
}

/**
 * 時間格式化
 * @param  {Any} format 轉換格式
 * new Date().format('yyyyMMdd') -> "20200921"
 * new Date().format('yyyy-MM-dd') -> "2020-09-21"
 * new Date().format('yyyy-MM-dd hh:mm:ss') -> "2020-09-21 16:07:59"
 */
// function parseTime(date = new Date(), format = "yyyy-MM-dd hh:mm:ss"){
Date.prototype.format = function(format = "yyyy-MM-dd hh:mm:ss") {
  let o = {
    "M+": this.getMonth() + 1, // 月份
    "d+": this.getDate(), // 日
    "H+": this.getHours(), // 小時
    "h+": this.getHours(), // 小時
    "m+": this.getMinutes(), // 分
    "s+": this.getSeconds(), // 秒
    "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
    "S": this.getMilliseconds() // 毫秒
  };
  if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if(new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

//-----------------------DOM-----------------------
/**
 * 滾動至指定位置
 * @param  {String, Number} el 滾動位置(預設為'top',可選：'top', 'bottom', '.foobar', 300)
 * @param  {Number} speed 滾動時間(預設為5,瞬移為1)
 * @param  {Number} offset 自定偏移(可接受正負數字)
 * @param  {Function} callback 回調函式
 * scrollTo();
 * scrollTo('top', 1);
 * scrollTo('.foobar', 10, -30, () => {console.log('滾動完成')});
 */
function scrollTo(el = "top", speed = 5, offset = 0, callback = () => {}) {
  let scrollTop = document.scrollingElement.scrollTop;
  let top = 0;
  if(typeof el === 'number'){
    top = el + offset;
  }else{
    if(el === 'top'){
      top = 0 + offset;
    }else if(el === 'bottom'){
      top = document.body.scrollHeight - document.body.clientHeight + offset;
    }else{
      top = document.querySelector(el).offsetTop + offset;
    }
  }
  function scroll() {
    scrollTop = scrollTop + (top - scrollTop) / speed;
    if (Math.abs(scrollTop - top) <= 1) {
      document.scrollingElement.scrollTop = top;
      callback && callback();
      return;
    }
    document.scrollingElement.scrollTop = scrollTop;
    requestAnimationFrame(scroll);
  };
  scroll();
};

/**
 * 取得頁面當前捲動高度(寬度)
 * @param  {Any} direction 改取寬度
 */
function getPageScroll(direction){
  if(direction){
    return document.documentElement.scrollLeft || document.body.scrollLeft;
  }else{
    let bodyTop = 0;
    if(typeof window.pageYOffset != "undefined") {
      bodyTop = window.pageYOffset;
    }else if(typeof document.compatMode != "undefined"
        && document.compatMode != "BackCompat") {
      bodyTop = document.documentElement.scrollTop;
    }else if(typeof document.body != "undefined") {
      bodyTop = document.body.scrollTop;
    }
    return bodyTop;
  }
}

/**
 * 取得頁面總高度(寬度)
 * @param  {Any} direction 改取寬度
 */
function getPage(direction) {
  let el = document.compatMode == "BackCompat" ? document.body : document.documentElement;
  if(direction){
    return Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, el.clientWidth);
  }else{
    return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, el.clientHeight);
  }
}

/**
 * 取得頁面可視高度(寬度)
 * @param  {Any} direction 改取寬度
 */
function getPageView(direction) {
  let el = document.compatMode == "BackCompat" ? document.body : document.documentElement;
  if(direction){
    return el.clientWidth;
  }else{
    return el.clientHeight;
  } 
}

//-----------------------Verify-----------------------
/**
 * 各式驗證函式
 * @param  {String} type 驗證類型
 * @param  {Any} val 要驗證的值
 * @param  {String} regex 指定正則表達式
 */
function isRegex(type, val, regex){
  switch (type) {
    // 姓名驗證
    case "name":
      return /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(val);
      break;
    // 電話驗證
    case "phone":
      return /^09[0-9]{8}$/.test(val);
      break;
    // 電子郵件驗證
    case "email":
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(val);
      break;
    // 身分證字號驗證
    case "idcard":
      return /^[A-Z](1|2)[0-9]{8}$/.test(val);
      break;
    // 日期驗證(1988-05-27)
    case "date":
      return /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/.test(val);
      break;
    // 數字驗證
    case "number":
      return !isNaN(val);
      break;
    // 網址驗證
    case "url":
      return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(val);
      break;
    // IP地址驗證
    case "ip":
      return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(val);
      break;
    // Hex色碼驗證
    case "hex":
      return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(val);
      break;
    //校驗是否為指定正則表達式
    case "regex":
      let regexMode = new RegExp(regex);
      return regexMode.test(val);
      break;
  }
}

/**
 * 精準數字驗證
 * @param  {Any} val 要驗證的值
 */
function isNumber(val){
  if(typeOf(val) !== "number"){
    return false;
  }else{
    return !isNaN(val);
  }
}

/**
 * 未填入驗證
 * @param  {Any} val 要驗證的值
 */
function isEmpty(val){
  switch(typeOf(val)){
    case "string":
      if(val.trim().length === 0) return true;
      break;
    case "number":
      break;
    case "boolean":
      if(!val) return true;
      break;
    case "array":
      if(val.length === 0) return true;
      if(val.some(i => i.length === 0)) return true;
      break;
    case "object":
      break;
    case "null":
      return true;
      break;
    case "undefined":
      return true;
      break;
  }
  return false;
}

// 身分證驗證
function isIdCard(idStr){
  // 依照字母的編號排列，存入陣列備用。
  let letters = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'I', 'O');
  // 儲存各個乘數
  let multiply = new Array(1, 9, 8, 7, 6, 5, 4, 3, 2, 1);
  let nums = new Array(2);
  let firstChar;
  let firstNum;
  let lastNum;
  let total = 0;
  // 撰寫「正規表達式」。第一個字為英文字母，
  // 第二個字為1或2，後面跟著8個數字，不分大小寫。
  let regExpID=/^[a-z](1|2)\d{8}$/i; 
  // 使用「正規表達式」檢驗格式
  if(idStr.search(regExpID)==-1) {
    // 基本格式錯誤
    // alert("請仔細填寫身份證號碼");
    return false;
  }else {
    // 取出第一個字元和最後一個數字。
    firstChar = idStr.charAt(0).toUpperCase();
    lastNum = idStr.charAt(9);
  }
  // 找出第一個字母對應的數字，並轉換成兩位數數字。
  for(var i=0; i<26; i++) {
    if(firstChar == letters[i]) {
      firstNum = i + 10;
      nums[0] = Math.floor(firstNum / 10);
      nums[1] = firstNum - (nums[0] * 10);
      break;
    } 
  }
  // 執行加總計算
  for(var i=0; i<multiply.length; i++){
    if(i<2) {
      total += nums[i] * multiply[i];
    }else {
      total += parseInt(idStr.charAt(i-1)) * multiply[i];
    }
  }
  // 和最後一個數字比對
  if((10 - (total % 10))!= lastNum) {
    // alert("身份證號碼寫錯了！");
    return false;
  } 
  return true;
}

//-----------------------Browser-----------------------
/**
 * 取得LocalStorage的值
 * @param  {String} key 鍵值
 */
function getLocalStorage(key) {
  return localStorage.getItem(key);
}

/**
 * 設定LocalStorage的值
 * @param  {String} key 鍵值
 * @param  {String} val 屬性值
 */
function setLocalStorage(key, val) {
  localStorage.setItem(key, val);
}

/**
 * 取得Cookie的值
 * @param  {String} name 名稱值
 */
function getCookie(name) {
  let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
  if (arr != null) return unescape(arr[2]);
  return null;
}

/**
 * 設置cookie值
 * @param  {String} name 名稱值
 * @param  {String} value 屬性值
 * @param  {String} Hours 過期時間
 */
function setCookie(name, value, Hours) {
  var d = new Date();
  var offset = 8;
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  var nd = utc + 3600000 * offset;
  var exp = new Date(nd);
  exp.setTime(exp.getTime() + Hours * 60 * 60 * 1000);
  document.cookie =
    name +
    "=" +
    escape(value) +
    ";path=/;expires=" +
    exp.toGMTString() +
    ";domain=360doc.com;";
}

/**
 * 函式防抖
 * @description 將幾次操作合併為一次操作進行
 * @param  {Function} fn 處理函式
 * @param  {Number} wait 停止後等待時間 預設為200ms
 * window.addEventListener('scroll', debounce(() => console.log(getRandom), 500));
 */
function debounce(fn, wait = 200) {
  let timeout = null;
  return () => {
    if(timeout !== null)
      clearTimeout(timeout);
    timeout = setTimeout(fn, wait);
  }
}

/**
 * 函式節流
 * @description 一定時間內只觸發一次函式
 * @param  {Function} fn 處理函式
 * @param  {Number} delay 處理間隔時間 預設為1000ms
 * window.addEventListener('scroll', throttle(() => console.log(getRandom), 2000));
 */
function throttle(fn, delay = 1000) {
  let prev = Date.now();
  return () => {
    let context = this;
    let args = arguments;
    let now = Date.now();
    if (now - prev >= delay) {
      fn.apply(context, args);
      prev = Date.now();
    }
  }
}

function throttle2(fn, delay){
  let timer; 
  let prevTime;
  return (...args) => {
    let currTime = Date.now();
    let context = this;
    if(!prevTime) prevTime = currTime;
    clearTimeout(timer);
    
    if(currTime - prevTime > delay){
        prevTime = currTime;
        fn.apply(context,args);
        clearTimeout(timer);
        return;
    }

    timer = setTimeout(() => {
        prevTime = Date.now();
        timer = null;
        fn.apply(context,args);
    },delay);
  }
}

//-----------------------Web-----------------------
/**
 * 查詢網址所帶參數
 * @param  {String} key 鍵值
 * @param  {String} url 網址
 */
function queryString(key = "", url = location.href) {
  let parseUrl = new URL(url);
  return parseUrl.searchParams.get(key);
}

/**
 * 解析網址
 * @param  {String} url 網址
 */
function parseUrl(url = location.href) {
  let parseUrl = new URL(url);
  return parseUrl;
}

/**
 * 網址跳轉
 * @param  {String} url 欲跳轉的網址
 */
function toUrl(url){
  window.location.href = url;
}

/**
 * 跳頁重整
 */
function jumpReload(){
  window.onpageshow = event => {
    if(event.persisted) window.location.reload();
  };
}

//-----------------------Device-----------------------
/**
 * 判斷是否移動裝置
 */
function isMobileUserAgent() {
  return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
    window.navigator.userAgent.toLowerCase()
  );
}

/**
 * 判斷是否蘋果移動裝置
 */
function isAppleMobileDevice() {
  return /iphone|ipod|ipad|Macintosh/i.test(navigator.userAgent.toLowerCase());
}

/**
 * 判斷是否安卓移動裝置
 */
function isAndroidMobileDevice() {
  return /android/i.test(navigator.userAgent.toLowerCase());
}


export { 
  nl2br,
  randomString,
  formatNumber,
  copyTextToClipboard,
  getRandom,
  round,
  imageLoaded,
  imageAllLoaded,
  isRepeat,
  uniqArray,
  flatArray,
  indexOfAll,
  intersection,
  shuffle,
  typeOf,
  filterObj,
  deleteObj,
  deepCloneSimple,
  deepClone,
  isLeapYear,
  isExistDate,
  getColonTimeFromDate,
  getDaysDiffBetweenDates,
  isAfterDate,
  isBeforeDate,
  getDiffDate,
  uniqueId,
  scrollTo,
  getPageScroll,
  getPage,
  getPageView,
  isRegex,
  isNumber,
  isEmpty,
  isIdCard,
  getLocalStorage,
  setLocalStorage,
  getCookie,
  setCookie,
  debounce,
  throttle,
  queryString,
  parseUrl,
  toUrl,
  jumpReload,
  isMobileUserAgent,
  isAppleMobileDevice,
  isAndroidMobileDevice
}