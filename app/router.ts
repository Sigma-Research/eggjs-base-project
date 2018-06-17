/**
 * @file 内部路由
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import { Application } from 'egg';

export default (app: Application) => {
  const { router, controller, middleware } = app;
  const { user } = controller;
  // 登录
  router.post('/login', user.login);
  // 注册
  router.post('/register', user.register);
  // 获取个人信息
  router.get('/user/getOneById', middleware.authLogin, user.getOneById);
};
