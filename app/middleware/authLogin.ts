/**
 * @file 用户登录验证中间件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

export default () => {
  // TODO 参数传递的类型有问题，egg没有重写koa的url method导致一旦使用类型限定middleware必须要传IRouterContext
  return async (ctx, next) => {
    if (!ctx.session.userId) {
      ctx.body = {
        status: 1006,
        statusInfo: '用户未登录',
      };
      return;
    }
    ctx.app.userId = ctx.session.userId;
    await next();
  };
};
