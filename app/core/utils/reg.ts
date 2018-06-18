/**
 * @file 项目相关所有正则
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
export default class Reg {
  public readonly username = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
  public readonly password = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
  public readonly idCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  public readonly phoneNumber = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  public readonly email = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  public readonly tel = /^(\(\d{3,4}\)|\d{3,4}-)?\d{7,8}$/;
  public readonly url = /.*?((?:http|https)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i;
  public readonly uri = /.*?((?:http|https|file)(?::\/{2}[\w]+)(?:[\/|\.]?)(?:[^\s"]*)).*?/i;
  public readonly number = /^[0-9]*$/;
}
