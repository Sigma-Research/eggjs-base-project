/**
 * @file 用户表
 * @author zengbaoqing<misterapptracy@gmail.com>
 * @desc  allowUpdate 在 sequlize基础上新增的字段，在更新的时候默认删除allowUpdate===false的字段
 * @desc  避免不必要的问题产生 默认为true
 */
'use strict';
import { Application } from 'egg';
import * as Sequelize from 'sequelize';
import * as superSequelize from '../core/base/typings/modelService';
import reg from '../core/utils/reg';

export interface Attribute {
  id?: string;
  username?: string;
  nickname?: string;
  password?: string;
  headImageUrl?: string;
  updateTime?: number;
  createTime?: number;
  isDel?: number;
}

export type Instance = Sequelize.Instance<Attribute> & Attribute;

export const defineAttributes: superSequelize.DefineAttributes = {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键',
    allowUpdate: false,
  },
  username: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '应用的唯一key',
    validate: {
      is: new reg().username,
    },
    allowUpdate: false,
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
      is: new reg().url,
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
    type: Sequelize.INTEGER(1),
    allowNull: true,
    defaultValue: 0,
    comment: '用于逻辑删除',
  },
};

export default (app: Application) => {
  const { model } = app;
  // todo 无法使用app.utils
  return model.define('user', defineAttributes, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
    ],
  });
};
