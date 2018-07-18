/**
 * @file 项目相关所有正则
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
export default  {
  username : /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/,
  password :/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/,
  idCard : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  phoneNumber : /^0?1[3|4|5|6|7|8][0-9]\d{8}$/,
  email : /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
  tel : /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/,
  url : /.*?((?:http|https)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i,
  uri : /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i,
  number :/^[0-9]*$/,
};
