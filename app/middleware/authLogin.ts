/**
 * @file 用户登录验证中间件
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import { Context } from 'egg';

export default (): any => {
  return async (ctx: Context, next: any) => {
    if (!ctx.session.userId) {
      ctx.body = {
        status: 1006,
        statusInfo: '用户未登录',
      };
      return;
    }
    ctx.data = {...(ctx.data || {}), userId: ctx.session.userId};
    await next();
  };
};
