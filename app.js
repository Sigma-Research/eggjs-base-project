/**
 * @file 项目统一入口页面
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
const loadRedisCommand = require('./app/core/redisCommand');
const path = require('path');

module.exports = app => {
  // 加载工具方法到app
  const direcotry = path.join(app.config.baseDir, 'app/core/utils');
  app.loader.loadToApp(direcotry, 'utils', {});
  // 应用会等待这个函数执行完成才启动
  app.beforeStart(async () => {
    const { redis, config } = app;
    // 同步表结构
    // app.model.sync();
    // 加载redis的自定义命令
    loadRedisCommand(app);
    // 删除定时器的单一串行锁
    const commandList = [];
    Object.keys(config.scheduleLockKey).forEach(key => {
      commandList.push([ 'del', config.scheduleLockKey[key] ]);
    });
    await redis.multi(commandList).exec();
  });
  // 设置路由前缀
  app.router.opts.prefix = '/api';
};