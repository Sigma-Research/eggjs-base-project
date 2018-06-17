/**
 * @file 项目相关所有正则
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
export default class Reg {
  public get username() {
    return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
  }
  public get password() {
    return /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
  }
  public get idCard() {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  }
  public get phoneNumber() {
    return /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  }
  public get email() {
    return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  }
  public get tel() {
    return /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
  }
  public get url() {
    return /.*?((?:http|https)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i;
  }
  public get uri() {
    return /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i;
  }
  public get number() {
    return /^[0-9]*$/;
  }
}
