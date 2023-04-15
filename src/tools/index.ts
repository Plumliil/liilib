import pinyin from "./pinyin";
/**
 * 获取当前时间
 * @param type 时间格式
 * DD/MM/YYYY , MM/DD/YYYY , YYYY.MM.DD , MM DD/YYYY , YYYY.MM.DD , YYYY/MM/DD , YYYY-MM-DD
 * h:m:s h:m
 * @returns 字符串 格式化后的时间
 */
const curTimeFormat = (type: string) => {
  let time = new Date();
  let YYYY = time.getFullYear();
  let MM =
    time.getMonth() < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1;
  let DD = time.getDate() < 10 ? `0${time.getDate()}` : time.getDate();
  let h = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
  switch (type) {
    case "DD/MM/YYYY":
      return `${DD}/${MM}/${YYYY}`;
    case "MM/DD/YYYY":
      return `${MM}/${DD}/${YYYY}`;
    case "MM DD/YYYY":
      return `${MM} ${DD}/${YYYY}`;
    case "YYYY.MM.DD":
      return `${YYYY}.${MM}.${DD}`;
    case "YYYY/MM/DD":
      return `${YYYY}/${MM}/${DD}`;
    case "YYYY-MM-DD":
      return `${YYYY}-${MM}-${DD}`;
    case "DD/MM/YYYY h:m:s":
      return `${DD}/${MM}/${YYYY} ${h}:${m}:${s}`;
    case "DD/MM/YYYY h:m":
      return `${DD}/${MM}/${YYYY} ${h}:${m}`;
    case "MM/DD/YYYY h:m:s":
      return `${MM}/${DD}/${YYYY} ${h}:${m}:${s}`;
    case "MM/DD/YYYY h:m":
      return `${MM}/${DD}/${YYYY} ${h}:${m}`;
    case "MM DD/YYYY h:m:s":
      return `${MM} ${DD}/${YYYY} ${h}:${m}:${s}`;
    case "MM DD/YYYY h:m":
      return `${MM} ${DD}/${YYYY} ${h}:${m}`;
    case "YYYY.MM.DD h:m:s":
      return `${YYYY}.${MM}.${DD} ${h}:${m}:${s}`;
    case "YYYY.MM.DD h:m":
      return `${YYYY}.${MM}.${DD} ${h}:${m}`;
    case "YYYY/MM/DD h:m:s":
      return `${YYYY}/${MM}/${DD} ${h}:${m}:${s}`;
    case "YYYY/MM/DD h:m":
      return `${YYYY}/${MM}/${DD} ${h}:${m}`;
    case "YYYY-MM-DD h:m:s":
      return `${YYYY}-${MM}-${DD} ${h}:${m}:${s}`;
    case "YYYY-MM-DD h:m":
      return `${YYYY}-${MM}-${DD} ${h}:${m}`;
    case "h:m:s":
      return `${h}:${m}:${s}`;
    case "h:m":
      return `${h}:${m}`;
    default:
      return `${YYYY}-${MM}-${DD} ${h}:${m}:${s}`;
  }
};
/**
 * 随机数生成 支持小数(两位) 默认1-100
 * @param min number 最小值
 * @param max number 最大值
 * @param Integer boolean 默认为true 整数
 * @returns
 */
const createRdm = (
  min: number = 0,
  max: number = 100,
  Integer: boolean = true
) => {
  if (!Integer)
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// 颜色转换 参数rgb 格式限定(r,g,b) 或 r,g,b
/**
 * rgb hex 颜色转换
 * @param data 转换前颜色如 (255,255,255) #FFFFFF
 * @param type 转化的另一种颜色格式 hex 或 rgb
 * @returns
 */
const Rgb_Hex = (data: string, type: "rgb" | "hex") => {
  const reg =
    type === "hex"
      ? /^\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/
      : /^#(\w{2})(\w{2})(\w{2})$/;
  let arr = reg.exec(data);
  if (!arr) return new Error("请检查参数传入是否正确");

  const toHex = (x: string): string => {
    return ("0" + parseInt(x).toString(16)).slice(-2);
  };

  const toRgb = (x: string): number => {
    return parseInt(x, 16);
  };
  const result = {
    hex: ("#" + toHex(arr[1]) + toHex(arr[2]) + toHex(arr[3])).toUpperCase(),
    rgb: `(${toRgb(arr[1])},${toRgb(arr[2])},${toRgb(arr[3])})`,
  };
  return result[type]
    ? result[type]
    : new Error(`${type} 格式出错 请输入正确格式`);
};

// 随机颜色生成 参数type 默认rgb 可选hex
/**
 * 随机颜色生成
 * @param type 颜色类型 rgb或hex 默认为rgb
 * @returns 生成的颜色值
 */
const colorRdm = (type: "rgb" | "hex" = "rgb") => {
  let min = 0;
  let max = 255;
  let r = Math.floor(Math.random() * (max - min) + min);
  let g = Math.floor(Math.random() * (max - min) + min);
  let b = Math.floor(Math.random() * (max - min) + min);
  if (type === "hex") return Rgb_Hex(`(${r},${g},${b})`, "hex");
  return `(${r},${g},${b})`;
};

// 文件批量分类
// 按后缀分类
// 用于后端获取图片，视频，音频链接后的分类
// interface FilesProps {
//   [key: string]: string[] | [];
// }
const filType = (fileName: string[]) => {
  const videoReg = /[\w\/\.]*?\.(AVI|FLV|F4V|FLC|MP4|MKV|M4V|WMV|WEBM)$/gi;
  const audioReg = /[\w\/\.]*?\.(APE|AU|MP3|MID|MOD|OGG|WMA)$/gi;
  const wordReg = /[\w\/\.]*?\.(TXT|DOC|WPS|DOCX|XLS|XLSX|PDF)$/gi;
  const photoReg = /[\w\/\.]*?\.(GIF|JPG|PNG|PSD|BMP|JPEG|PSD|jpeg)/gi;
  const compressedReg = /[\w\/\.]*?\.(RAR|ZIP|7Z)$/gi;
  let flag = true;
  let files: any = {
    video: [],
    audio: [],
    word: [],
    photo: [],
    compressed: [],
    other: [],
  };

  for (let i = 0; i < fileName.length; i++) {
    if (audioReg.test(fileName[i])) {
      files["audio"].push(fileName[i]);
    } else if (videoReg.test(fileName[i])) {
      files["video"].push(fileName[i]);
    } else if (wordReg.test(fileName[i])) {
      files["word"].push(fileName[i]);
    } else if (photoReg.test(fileName[i])) {
      files["photo"].push(fileName[i]);
    } else if (compressedReg.test(fileName[i])) {
      files["compressed"].push(fileName[i]);
    } else {
      files["other"].push(fileName[i]);
    }
  }
  return files;
};
// Promise封装sleep函数 返回一个Promise对象
function sleep(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(delay), delay);
  });
}
// 字符串函数封装
// 字符串倒序 reverseString(str) 生成一个倒序字符串
/**
 * 字符串倒序
 * @param str 目标字符串
 * @returns 倒叙后的字符串
 */
function reverseStr(str: string) {
  // 将字符串转为数组
  let res = [];
  for (let i = 0; i < [...str].length; i++) {
    res[i] = [...str][[...str].length - 1 - i];
  }
  return res.join("");
}
// 回文字符串 palindrome(str) 如果给定的字符串时回文，返回true，否则返回false
/**
 *判断传入字符串是否为回文字符串
 * @param str 目标字符串
 * @returns boolean
 */
function palindrome(str: string) {
  let res = [];
  for (let i = 0; i < [...str].length; i++) {
    res[i] = [...str][[...str].length - 1 - i];
  }
  return str === res.join("");
}
/**
 * 截取字符串 如果字符串的长度超过了num，截取前面num长度部分，并以...结束
 * @param str 目标字符串
 * @param num 截取长度
 * @returns 截取后字符串
 */
function truncate(str: string, num: number) {
  let result = [];
  for (let i = 0; i < [...str].length; i++) {
    if (i < num) {
      result.push([...str][i]);
    }
  }
  return result.join("") + "...";
}
/**
 * 拼音搜索
 * @param value 传入的字符串
 * @param type 是否首字母大写
 * @returns 转化后的拼音
 */
function pySearch(value: string, type: boolean = false) {
  let rname = "";
  for (let key in pinyin) {
    // @ts-ignore
    if (pinyin[key].includes(value)) {
      if (type) {
        rname = key;
      } else {
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
function pinYin(value: string, type: boolean = true) {
  let name = "";
  [...value].forEach((item) => {
    name = name + pySearch(item, type);
  });
  return name;
}

export {
  curTimeFormat,
  colorRdm,
  createRdm,
  filType,
  Rgb_Hex,
  sleep,
  reverseStr,
  palindrome,
  truncate,
  pinYin,
};
