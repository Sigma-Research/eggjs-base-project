/**
 * @file 内部路由
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

module.exports = app => {
  const { router, controller, middlewares } = app;
  const { user } = controller;
  // 登录
  router.post('/login', user.login);
  // 注册
  router.post('/register', user.register);
  // 获取个人信息
  router.get('/user/getOneById', middlewares.authLogin(), user.getOneById);
};
