/**
 * @file 线上环境配置文件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import { DefaultConfig } from './config.default';

module.exports = () => {
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
    // mysql 配置
    sequelize: {
      dialect: 'mysql',
      database: '<your mysql db>',
      username: '<your mysql username>',
      password: '<your mysql password>',
      host: '<your mysql host>',
      port: 3306,
      pool: {
        max: 100,
        min: 0,
        idle: 10000,
      },
      define: {
        engine: 'InnoDB',
        timestamp: false,
        createdAt: 'createTime',
        updatedAt: 'updateTime',
        charset: 'utf8',
      },
    },
  };
  return config;
};
