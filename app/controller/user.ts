/**
 * @file 用户控制
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

import { Controller } from 'egg';
import * as md5 from 'md5';
export default class UserController extends Controller {

  public async login() {
    const { ctx, service, app } = this;
    const { reg } = app.utils;
    const { username, password } = ctx.request.body;
    if (!reg.username.test(username) || !reg.password.test(password)) {
      ctx.body = {
        status: 1002,
        statusInfo: '参数错误',
      };
      return;
    }
    const user = await service.user.getOne({ username }, ['_id', 'username', 'password']);
    console.log(user);
    if (!user || user.password !== md5(password)) {
      ctx.body = {
        status: 1004,
        statusInfo: '用户名或密码错误',
      };
      return;
    }
    ctx.session.userId = user._id;
    ctx.body = {
      status: 0,
    };
  }

  public async register() {
    const { ctx, service, app } = this;
    const { reg } = app.utils;
    const { username, password, nickname, headImageUrl } = ctx.request.body;
    if (!reg.username.test(username) || !reg.password.test(password)) {
      ctx.body = {
        status: 1002,
        statusInfo: '参数错误',
      };
      return;
    }
    const user = await service.user.getOne({ username }, ['username']);
    if (user) {
      ctx.body = {
        status: 1001,
        statusInfo: '用户已经存在',
      };
      return;
    }
    ctx.body = {
      status: 0,
      data: await service.user.create({
        username,
        nickname,
        headImageUrl,
        password: md5(password),
      }),
    };
  }

  public async getOneById() {
    const { ctx, service } = this;
    const { userId } = ctx.data;
    const user = await service.user.getOne({ id: userId });
    ctx.body = {
      status: 0,
      data: user,
    };
  }
}
