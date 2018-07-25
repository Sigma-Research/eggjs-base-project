/**
 * @file 测试环境配置文件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

module.exports = {
  // redis配置
  redis: {
    client: {
      port: 6379,
      host: '<your redis host>',
      password: '',
      db: '<your redis db>',
    }
  },
  // mysql 配置
  sequelize: {
    dialect: 'mysql',
    database: '<your mysql db>',
    username: '<your mysql username>',
    password: '<your mysql password>',
    host: '<your mysql host>',
    logging: false,
    port: 3306,
    pool: {
      max: 100,
      min: 0,
      idle: 10000
    },
    define: {
      engine: 'InnoDB',
      timestamps: false,
      createdAt: 'createTime',
      updatedAt: 'updateTime',
      charset: 'utf8'
    }
  },
};