/**
 * 用于将一个地址字符串替换为另一个对象中相应路径的值。默认值对象和sourceData对象
 * @param path 带抽取地址
 * @param sourceData 目标对象
 * @returns
 */
export declare function getValueByPath(path: string, sourceData: any): any;
/**
 * 用于将一个对象中的地址值替换为另一个对象中相应路径的值。默认值对象和sourceData对象
 * @param path 抽取的对象 {字段:默认值}
 * @param sourceData
 * @returns
 */
export declare function getValueByPathObj(path: {
    [key: string]: any;
}, sourceData: any): any;
