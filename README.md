[TOC]

<div
    align=center
     style="text-align-center"
    >
    <!-- <img src="https://gitee.com/Plumliil/images/raw/master/MdPicture/20220104173804.png"  > -->
    <!--<img src="https://raw.githubusercontent.com/Plumliil/images/main/img/logo.png" style="border-radius:50%"/>-->
    <img src="https://s2.loli.net/2022/04/05/qa4sCStuDX5gyBb.png" style="border-radius:50%" />
</div>
<div align=center>
    <a href="https://github.com/Plumliil/liilib" style="font-size:30px;font-weight:700;text-decoration: none;" title="Plumliil">Plumliil</a>
</div>


# 常用函数库

## 工具

### 获取数据类型

#### 描述

通过调用方法来判断某个值的类型

#### 用法

|   #    |          解释          |
| :----: | :--------------------: |
|  语法  | `PliLib.typeOf(value)` |
|  参数  |   value:需要判断的值   |
| 返回值 | 返回获取对应的数据类型 |

#### 示例

```javascript
let a = {},
  b = [],
  c = null,
  d;
console.log(PliLib.typeOf(a)); // object
console.log(PliLib.typeOf(b)); // array
console.log(PliLib.typeOf(c)); // null
console.log(PliLib.typeOf(d)); // undefined
```

### 获取当前时间

#### 描述

通过调用方法来获取当前时间

#### 用法

|   #    |                       解释                       |
| :----: | :----------------------------------------------: |
|  语法  |              `curTimeFormat(type)`               |
|  参数  | type:获取时间的格式 目前支持 20 种不同形式的时间 |
| 返回值 |                  返回当前的时间                  |

#### 示例

```javascript
console.log(curTimeFormat("yyyy-mm-dd h:m:s")); // 2021-11-4 14:30:33
console.log(curTimeFormat("yyyy/mm/dd h:m")); // 2021/11/4 14:30
```

### 随机数生成

#### 描述

通过调用方法来获取随机数

#### 用法

|   #    |                               解释                                |
| :----: | :---------------------------------------------------------------: |
|  语法  |                   `createRdm(min,max,Integer)`                    |
|  参数  | min:最小值,max:最大值,Integer:是否为整数 boolean 默认为 true 整数 |
| 返回值 |                          返回当前的时间                           |

#### 示例

```javascript
console.log(createRdm(1, 100)); // 80
console.log(createRdm(1, 100, false)); // 69.94
```

### 随机颜色生成

#### 描述

通过调用方法来随机获取颜色，目前支持 rgb 和 hex 两种格式

#### 用法

|   #    |                       解释                        |
| :----: | :-----------------------------------------------: |
|  语法  |                 `colorRdm(type)`                  |
|  参数  | type:获取颜色的格式有 rgb 和 hex 两种，默认为 rgb |
| 返回值 |                   返回颜色的值                    |

#### 示例

```javascript
console.log(colorRdm()); // (153,17,88)
console.log(colorRdm("hex")); // #DF80CB
```

### 颜色格式转换

#### 描述

通过调用该方法来进行颜色的转换目前仅支持 rgb,hex 相互转换

#### 用法

|    #     |                                    解释                                     |
| :------: | :-------------------------------------------------------------------------: |
|   语法   |                            `Rgb_Hex(data,type)`                             |
|   参数   | data:转换前的颜色数据</br>type:获取颜色的格式有 rgb 和 hex 两种，默认为 rgb |
|  返回值  |                             返回转换后的颜色值                              |
| 支持格式 |                      rgb:(255,255,255)</br>hex:#FFFFFF                      |

#### 示例

```javascript
console.log(Rgb_Hex("(255,255,255)", "hex")); // #FFFFFF
console.log(Rgb_Hex("#FFFFFF", "rgb")); // (255,255,255)
```

### 字符串回文

#### 描述

判断某一字符串是否是回文字符串

#### 用法

|   #    |                    解释                     |
| :----: | :-----------------------------------------: |
|  语法  |              `palindrome(str)`              |
|  参数  |            str:需要判断的字符串             |
| 返回值 | 如果是回文字符串则返回 true，反之返回 false |

#### 示例

```javascript
let str = "12321";
let str2 = "12345";

console.log(palindrome(str)); // true
console.log(palindrome(str2)); // false
```

### 字符串倒序

#### 描述

生成给定字符串的倒序字符串

#### 用法

|   #    |            解释            |
| :----: | :------------------------: |
|  语法  |     `reverseStr(str)`      |
|  参数  |  str:需要进行倒序的字符串  |
| 返回值 | 返回传入字符串的倒序字符串 |

#### 示例

```javascript
let str = "倒叙字符串";

console.log(reverseStr(str)); // 串符字序倒
```

### 字符串截取

#### 描述

生成给定字符串进行截取，其他部分用 ... 代替

#### 用法

|   #    |                    解释                     |
| :----: | :-----------------------------------------: |
|  语法  |             `truncate(str,num)`             |
|  参数  | str:需要进行截取的字符串</br>num:截取的字数 |
| 返回值 |             返回截取后的字符串              |

#### 示例

```javascript
let str = "字符串截取字符串截取字符串截取字符串截取";

console.log(truncate(str, 9)); // 字符串截取字符串截...
```

### 文件分类

#### 描述

后端传来的连接格式可能不分通过调用该方法来可以对链接进行分类

#### 用法

|   #    |          解释           |
| :----: | :---------------------: |
|  语法  |     `filType(file)`     |
|  参数  | file:包含文件链接的数组 |
| 返回值 |    返回分类后的链接     |

#### 示例

```javascript
let file = [
  "120201197411173093.mp3",
  "120201197411173093.txt",
  "130201198409273008.mp4",
  "210201200101149246.jpg",
  "210201200101149246.m4v",
  "210201200101149246.pdf",
  "21020120010asda../\114as46.png",
  "21020120010114as46.docx",
  "2102012001011)_49246.zip",
  "460101198309075187.gif",
];
console.log(filType(file));
// {
//   video: [ '130201198409273008.mp4', '210201200101149246.m4v' ],
//   audio: [ '120201197411173093.mp3' ],
//   word: [
//     '120201197411173093.txt',
//     '210201200101149246.pdf',
//     '21020120010114as46.docx'
//   ],
//   photo: [
//     '210201200101149246.jpg',
//     '21020120010asda../Las46.png',
//     '460101198309075187.gif'
//   ],
//   compressed: [ '2102012001011)_49246.zip' ],
//   other: []
// }
```

### 文字转拼音

#### 描述

通过调用方法来获取返回的拼音

#### 用法

|   #    |                             解释                              |
| :----: | :-----------------------------------------------------------: |
|  语法  |                    `toPinYin(value,type)`                     |
|  参数  | value:需要转化的文字</br>type:是否需要首字母大写 默认为 false |
| 返回值 |                        返回生成的拼音                         |

#### 示例

```javascript
console.log(toPinYin("你好啊!")); // nihaoa
console.log(toPinYin("你好啊!", true)); // NiHaoA
```
