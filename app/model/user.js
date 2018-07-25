/**
 * @file 用户表
 * @author zengbaoqing<misterapptracy@gmail.com>
 * @desc  allowUpdate 在 sequlize基础上新增的字段，在更新的时候默认删除allowUpdate===false的字段
 * @desc  避免不必要的问题产生 默认为true
 */
'use strict';
const reg = require('../core/utils/reg');

module.exports = app => {
  const { Sequelize, model } = app;
  // todo 无法使用app.utils
  const schema = {
    id: {
      type: Sequelize.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      comment: '自增主键',
      allowUpdate: false
    },
    username: {
      type: Sequelize.STRING(32),
      allowNull: false,
      comment: '应用的唯一key',
      validate: {
        is: reg.username
      },
      allowUpdate: false
    },
    nickname: {
      type: Sequelize.STRING(32),
      allowNull: false,
      defaultValue: '',
      comment: '昵称',
    },
    password: {
      type: Sequelize.STRING(64),
      allowNull: false,
      defaultValue: '',
      comment: '密码',
    },
    headImageUrl: {
      type: Sequelize.STRING(256),
      allowNull: true,
      comment: '头像地址',
      validate: {
        is: reg.url
      },
    },
    updateTime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      comment: '更新时间',
    },
    createTime: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
      comment: '创建时间',
    },
    isDel: {
      type: Sequelize.BIGINT(16),
      allowNull: true,
      defaultValue: 0,
      comment: '用于逻辑删除',
    },
  };
  return model.define('user', schema, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: [ 'username' ],
      },
    ],
  });
};
