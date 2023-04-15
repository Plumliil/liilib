/**
 * 获取当前时间
 * @param type 时间格式
 * DD/MM/YYYY , MM/DD/YYYY , YYYY.MM.DD , MM DD/YYYY , YYYY.MM.DD , YYYY/MM/DD , YYYY-MM-DD
 * h:m:s h:m
 * @returns 字符串 格式化后的时间
 */
declare const curTimeFormat: (type: string) => string;
/**
 * 随机数生成 支持小数(两位) 默认1-100
 * @param min number 最小值
 * @param max number 最大值
 * @param Integer boolean 默认为true 整数
 * @returns
 */
declare const createRdm: (min?: number, max?: number, Integer?: boolean) => number;
/**
 * rgb hex 颜色转换
 * @param data 转换前颜色如 (255,255,255) #FFFFFF
 * @param type 转化的另一种颜色格式 hex 或 rgb
 * @returns
 */
declare const Rgb_Hex: (data: string, type: "rgb" | "hex") => string | Error;
/**
 * 随机颜色生成
 * @param type 颜色类型 rgb或hex 默认为rgb
 * @returns 生成的颜色值
 */
declare const colorRdm: (type?: "rgb" | "hex") => string | Error;
declare const filType: (fileName: string[]) => any;
declare function sleep(delay?: number): Promise<unknown>;
/**
 * 字符串倒序
 * @param str 目标字符串
 * @returns 倒叙后的字符串
 */
declare function reverseStr(str: string): string;
/**
 *判断传入字符串是否为回文字符串
 * @param str 目标字符串
 * @returns boolean
 */
declare function palindrome(str: string): boolean;
/**
 * 截取字符串 如果字符串的长度超过了num，截取前面num长度部分，并以...结束
 * @param str 目标字符串
 * @param num 截取长度
 * @returns 截取后字符串
 */
declare function truncate(str: string, num: number): string;
/**
 * 拼音转化
 * @param value 传入的字符串
 * @param type 是否首字母大写
 * @returns 转化后的拼音
 */
declare function toPinYin(value: string, type?: boolean): string;
export { curTimeFormat, colorRdm, createRdm, filType, Rgb_Hex, sleep, reverseStr, palindrome, truncate, toPinYin, };
