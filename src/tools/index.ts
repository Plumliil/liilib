import { Color } from "./types";

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

/**
 * 颜色转换函数
 * @param colorValue 当前颜色 
 * @param targetType 目标格式
 * @returns 目标格式颜色
 */
function convertColor(colorValue: string, targetType: 'hex' | 'rgb'): string | Color | null {
  const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const rgbRegex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/;
  if (hexRegex.test(colorValue) && targetType === 'rgb') {
    const result = hexRegex.exec(colorValue);
    if (result) {
      return `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
    }
    return null;
  } else if (rgbRegex.test(colorValue) && targetType === 'hex') {
    const result = rgbRegex.exec(colorValue);
    if (result) {
      const [_, r, g, b] = result;
      const componentToHex = (c: number): string => {
        const hex = Math.round(c).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      };
      const hexR = componentToHex(parseInt(r, 10));
      const hexG = componentToHex(parseInt(g, 10));
      const hexB = componentToHex(parseInt(b, 10));
      return `#${hexR}${hexG}${hexB}`;
    }
    return null;
  }

  return null;
}


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
 * 判断输入的对象是否被包裹
 * @param input 
 * @returns 
 */
function isPropertyQuoted(input: string) {
  const regex = /"([^"]+)":/g;
  const matches = input.match(regex);

  if (matches) {
    return matches.every(match => match[0] === '"' && match[match.length - 1] === '"');
  }
  return false;
}

/**
 * json格式化
 * @param jsonData 待格式化JSON 
 * @returns 格式化后的JSON
 */
function formatJson(jsonData: any): string {
  try {
    // 如果输入是字符串，尝试解析为 JSON 对象
    // 如果属性没有双引号进行替换
    let parsedJson = null;
    if (typeof jsonData === 'string') {
      if (isPropertyQuoted(jsonData)) {
        parsedJson = JSON.parse(jsonData)
      } else {
        parsedJson = jsonData.replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": ')
        parsedJson = JSON.parse(parsedJson)
      }
    }
    // 使用 JSON.stringify 将其转换为格式化的 JSON 字符串
    const formattedJson = JSON.stringify(parsedJson, null, 4);
    return formattedJson;
  } catch (error: any) {
    return `Error formatting JSON: ${error.message}`;
  }
}

export {
  curTimeFormat,
  // colorRdm,
  createRdm,
  filType,
  // Rgb_Hex,
  sleep,
  reverseStr,
  palindrome,
  truncate,
  formatJson,
  convertColor
};
