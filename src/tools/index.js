"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPinYin = exports.truncate = exports.palindrome = exports.reverseStr = exports.sleep = exports.Rgb_Hex = exports.filType = exports.createRdm = exports.colorRdm = exports.curTimeFormat = void 0;
var pinyin_1 = require("./pinyin");
/**
 * 获取当前时间
 * @param type 时间格式
 * DD/MM/YYYY , MM/DD/YYYY , YYYY.MM.DD , MM DD/YYYY , YYYY.MM.DD , YYYY/MM/DD , YYYY-MM-DD
 * h:m:s h:m
 * @returns 字符串 格式化后的时间
 */
var curTimeFormat = function (type) {
    var time = new Date();
    var YYYY = time.getFullYear();
    var MM = time.getMonth() < 10 ? "0".concat(time.getMonth() + 1) : time.getMonth() + 1;
    var DD = time.getDate() < 10 ? "0".concat(time.getDate()) : time.getDate();
    var h = time.getHours() < 10 ? "0".concat(time.getHours()) : time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds() < 10 ? "0".concat(time.getSeconds()) : time.getSeconds();
    switch (type) {
        case "DD/MM/YYYY":
            return "".concat(DD, "/").concat(MM, "/").concat(YYYY);
        case "MM/DD/YYYY":
            return "".concat(MM, "/").concat(DD, "/").concat(YYYY);
        case "MM DD/YYYY":
            return "".concat(MM, " ").concat(DD, "/").concat(YYYY);
        case "YYYY.MM.DD":
            return "".concat(YYYY, ".").concat(MM, ".").concat(DD);
        case "YYYY/MM/DD":
            return "".concat(YYYY, "/").concat(MM, "/").concat(DD);
        case "YYYY-MM-DD":
            return "".concat(YYYY, "-").concat(MM, "-").concat(DD);
        case "DD/MM/YYYY h:m:s":
            return "".concat(DD, "/").concat(MM, "/").concat(YYYY, " ").concat(h, ":").concat(m, ":").concat(s);
        case "DD/MM/YYYY h:m":
            return "".concat(DD, "/").concat(MM, "/").concat(YYYY, " ").concat(h, ":").concat(m);
        case "MM/DD/YYYY h:m:s":
            return "".concat(MM, "/").concat(DD, "/").concat(YYYY, " ").concat(h, ":").concat(m, ":").concat(s);
        case "MM/DD/YYYY h:m":
            return "".concat(MM, "/").concat(DD, "/").concat(YYYY, " ").concat(h, ":").concat(m);
        case "MM DD/YYYY h:m:s":
            return "".concat(MM, " ").concat(DD, "/").concat(YYYY, " ").concat(h, ":").concat(m, ":").concat(s);
        case "MM DD/YYYY h:m":
            return "".concat(MM, " ").concat(DD, "/").concat(YYYY, " ").concat(h, ":").concat(m);
        case "YYYY.MM.DD h:m:s":
            return "".concat(YYYY, ".").concat(MM, ".").concat(DD, " ").concat(h, ":").concat(m, ":").concat(s);
        case "YYYY.MM.DD h:m":
            return "".concat(YYYY, ".").concat(MM, ".").concat(DD, " ").concat(h, ":").concat(m);
        case "YYYY/MM/DD h:m:s":
            return "".concat(YYYY, "/").concat(MM, "/").concat(DD, " ").concat(h, ":").concat(m, ":").concat(s);
        case "YYYY/MM/DD h:m":
            return "".concat(YYYY, "/").concat(MM, "/").concat(DD, " ").concat(h, ":").concat(m);
        case "YYYY-MM-DD h:m:s":
            return "".concat(YYYY, "-").concat(MM, "-").concat(DD, " ").concat(h, ":").concat(m, ":").concat(s);
        case "YYYY-MM-DD h:m":
            return "".concat(YYYY, "-").concat(MM, "-").concat(DD, " ").concat(h, ":").concat(m);
        case "h:m:s":
            return "".concat(h, ":").concat(m, ":").concat(s);
        case "h:m":
            return "".concat(h, ":").concat(m);
        default:
            return "".concat(YYYY, "-").concat(MM, "-").concat(DD, " ").concat(h, ":").concat(m, ":").concat(s);
    }
};
exports.curTimeFormat = curTimeFormat;
/**
 * 随机数生成 支持小数(两位) 默认1-100
 * @param min number 最小值
 * @param max number 最大值
 * @param Integer boolean 默认为true 整数
 * @returns
 */
var createRdm = function (min, max, Integer) {
    if (min === void 0) { min = 0; }
    if (max === void 0) { max = 100; }
    if (Integer === void 0) { Integer = true; }
    if (!Integer)
        return parseFloat((Math.random() * (max - min) + min).toFixed(2));
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};
exports.createRdm = createRdm;
// 颜色转换 参数rgb 格式限定(r,g,b) 或 r,g,b
/**
 * rgb hex 颜色转换
 * @param data 转换前颜色如 (255,255,255) #FFFFFF
 * @param type 转化的另一种颜色格式 hex 或 rgb
 * @returns
 */
var Rgb_Hex = function (data, type) {
    var reg = type === "hex"
        ? /^\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/
        : /^#(\w{2})(\w{2})(\w{2})$/;
    var arr = reg.exec(data);
    if (!arr)
        return new Error("请检查参数传入是否正确");
    var toHex = function (x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
    };
    var toRgb = function (x) {
        return parseInt(x, 16);
    };
    var result = {
        hex: ("#" + toHex(arr[1]) + toHex(arr[2]) + toHex(arr[3])).toUpperCase(),
        rgb: "(".concat(toRgb(arr[1]), ",").concat(toRgb(arr[2]), ",").concat(toRgb(arr[3]), ")"),
    };
    return result[type]
        ? result[type]
        : new Error("".concat(type, " \u683C\u5F0F\u51FA\u9519 \u8BF7\u8F93\u5165\u6B63\u786E\u683C\u5F0F"));
};
exports.Rgb_Hex = Rgb_Hex;
// 随机颜色生成 参数type 默认rgb 可选hex
/**
 * 随机颜色生成
 * @param type 颜色类型 rgb或hex 默认为rgb
 * @returns 生成的颜色值
 */
var colorRdm = function (type) {
    if (type === void 0) { type = "rgb"; }
    var min = 0;
    var max = 255;
    var r = Math.floor(Math.random() * (max - min) + min);
    var g = Math.floor(Math.random() * (max - min) + min);
    var b = Math.floor(Math.random() * (max - min) + min);
    if (type === "hex")
        return Rgb_Hex("(".concat(r, ",").concat(g, ",").concat(b, ")"), "hex");
    return "(".concat(r, ",").concat(g, ",").concat(b, ")");
};
exports.colorRdm = colorRdm;
// 文件批量分类
// 按后缀分类
// 用于后端获取图片，视频，音频链接后的分类
// interface FilesProps {
//   [key: string]: string[] | [];
// }
var filType = function (fileName) {
    var videoReg = /[\w\/\.]*?\.(AVI|FLV|F4V|FLC|MP4|MKV|M4V|WMV|WEBM)$/gi;
    var audioReg = /[\w\/\.]*?\.(APE|AU|MP3|MID|MOD|OGG|WMA)$/gi;
    var wordReg = /[\w\/\.]*?\.(TXT|DOC|WPS|DOCX|XLS|XLSX|PDF)$/gi;
    var photoReg = /[\w\/\.]*?\.(GIF|JPG|PNG|PSD|BMP|JPEG|PSD|jpeg)/gi;
    var compressedReg = /[\w\/\.]*?\.(RAR|ZIP|7Z)$/gi;
    var flag = true;
    var files = {
        video: [],
        audio: [],
        word: [],
        photo: [],
        compressed: [],
        other: [],
    };
    for (var i = 0; i < fileName.length; i++) {
        if (audioReg.test(fileName[i])) {
            files["audio"].push(fileName[i]);
        }
        else if (videoReg.test(fileName[i])) {
            files["video"].push(fileName[i]);
        }
        else if (wordReg.test(fileName[i])) {
            files["word"].push(fileName[i]);
        }
        else if (photoReg.test(fileName[i])) {
            files["photo"].push(fileName[i]);
        }
        else if (compressedReg.test(fileName[i])) {
            files["compressed"].push(fileName[i]);
        }
        else {
            files["other"].push(fileName[i]);
        }
    }
    return files;
};
exports.filType = filType;
// Promise封装sleep函数 返回一个Promise对象
function sleep(delay) {
    if (delay === void 0) { delay = 1000; }
    return new Promise(function (resolve) {
        setTimeout(function () { return resolve(delay); }, delay);
    });
}
exports.sleep = sleep;
// 字符串函数封装
// 字符串倒序 reverseString(str) 生成一个倒序字符串
/**
 * 字符串倒序
 * @param str 目标字符串
 * @returns 倒叙后的字符串
 */
function reverseStr(str) {
    // 将字符串转为数组
    var res = [];
    for (var i = 0; i < __spreadArray([], str, true).length; i++) {
        res[i] = __spreadArray([], str, true)[__spreadArray([], str, true).length - 1 - i];
    }
    return res.join("");
}
exports.reverseStr = reverseStr;
// 回文字符串 palindrome(str) 如果给定的字符串时回文，返回true，否则返回false
/**
 *判断传入字符串是否为回文字符串
 * @param str 目标字符串
 * @returns boolean
 */
function palindrome(str) {
    var res = [];
    for (var i = 0; i < __spreadArray([], str, true).length; i++) {
        res[i] = __spreadArray([], str, true)[__spreadArray([], str, true).length - 1 - i];
    }
    return str === res.join("");
}
exports.palindrome = palindrome;
/**
 * 截取字符串 如果字符串的长度超过了num，截取前面num长度部分，并以...结束
 * @param str 目标字符串
 * @param num 截取长度
 * @returns 截取后字符串
 */
function truncate(str, num) {
    var result = [];
    for (var i = 0; i < __spreadArray([], str, true).length; i++) {
        if (i < num) {
            result.push(__spreadArray([], str, true)[i]);
        }
    }
    return result.join("") + "...";
}
exports.truncate = truncate;
/**
 * 拼音搜索
 * @param value 传入的字符串
 * @param type 是否首字母大写
 * @returns 转化后的拼音
 */
function pySearch(value, type) {
    if (type === void 0) { type = false; }
    var rname = "";
    for (var key in pinyin_1.default) {
        // @ts-ignore
        if (pinyin_1.default[key].includes(value)) {
            if (type) {
                rname = key;
            }
            else {
                rname =
                    key.substring(0, 1).toUpperCase() + key.substring(1, key.length);
            }
        }
    }
    return rname;
}
/**
 * 拼音转化
 * @param value 传入的字符串
 * @param type 是否首字母大写
 * @returns 转化后的拼音
 */
function toPinYin(value, type) {
    if (type === void 0) { type = true; }
    var name = "";
    __spreadArray([], value, true).forEach(function (item) {
        name = name + pySearch(item, type);
    });
    return name;
}
exports.toPinYin = toPinYin;
