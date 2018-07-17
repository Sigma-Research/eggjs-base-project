/**
 * @file 用户登录验证中间件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
module.exports = () => {
  return async (ctx, next) => {
    if (!ctx.session.userId) {
      ctx.body = {
        status: 1006,
        statusInfo: '用户未登录'
      };
      return;
    }
    ctx.data = Object.assign(ctx.data || {}, { userId: ctx.session.userId });
    await next();
  };
};
