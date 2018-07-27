/**
 * @file 本地环境配置文件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import { DefaultConfig } from './config.default';

export default () => {
  const config: DefaultConfig = {
    // redis配置
    redis: {
      client: {
        port: 6379,
        host: '127.0.0.1',
        password: '',
        db: 0,
      },
    },
    // mongodb配置
    mongoose: {
      client: {
        url: 'mongodb://mongo.hexin.im/base',
        options: {
          server: {
            auto_reconnect: true,
            poolSize: 100,
          },
        },
      },
    },
  };
  return config;
};
