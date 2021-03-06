/**
 * @file 主要包含返回时间定义
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import { Context } from 'egg';

export default (): any => {
  return async (ctx: Context, next: any) => {
    const startTime = +new Date();
    await next();
    if (ctx.body && ctx.body.status === 0) {
      ctx.body.statusInfo = `${+new Date() - startTime}ms`;
    }
  };
};
