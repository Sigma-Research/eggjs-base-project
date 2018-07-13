/**
 * @file 测试环境配置文件
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
        host: '127.0.0.1',
        password: '',
        db: 0,
      },
    },
    // mysql 配置
    sequelize: {
      dialect: 'mysql',
      database: 'demo_test',
      username: 'root',
      host: 'localhost',
      password: 'Gx199492.',
      port: 3306,
      pool: {
        max: 100,
        min: 0,
        idle: 10000,
      },
      define: {
        engine: 'InnoDB',
        timestamps: false,
        createdAt: 'createTime',
        updatedAt: 'updateTime',
        charset: 'utf8mb4',
      },
    },
  };
  return config;
};
