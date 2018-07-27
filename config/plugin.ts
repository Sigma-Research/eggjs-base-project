/**
 * @file 插件配置
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
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
    package: 'egg-mongoose',
  },
  session: true,
};

export default plugin;
