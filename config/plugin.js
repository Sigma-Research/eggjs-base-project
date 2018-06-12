/**
 * @file 插件配置
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

module.exports = {
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  sessionRedis: {
    enable: true,
    package: 'egg-session-redis',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  session: true,
};
