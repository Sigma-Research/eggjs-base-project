/**
 * @file 线上环境配置文件
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
        host: '<your redis host>',
        password: '',
        db: '<your redis db>',
      },
    },
    // mongodb配置
    mongoose: {
      client: {
        url: '<your mongodb>',
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
