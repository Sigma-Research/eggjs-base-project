/**
 * @file 用户表
 * @author zengbaoqing<misterapptracy@gmail.com>
 * @desc  allowUpdate 在 sequlize基础上新增的字段，在更新的时候默认删除allowUpdate===false的字段
 * @desc  避免不必要的问题产生 默认为true
 */
'use strict';
import { Application } from 'egg';
import * as Sequelize from 'sequelize';
import ModelBizAttributes from '../core/base/modelBizAttributes';
import superSequelize from '../core/base/typings/modelService';
import reg from '../core/utils/reg';

export interface CusAttributes {
  username: string;
  nickname: string;
  password: string;
  headImageUrl: string;
}

// 字段声明
export type Attributes = superSequelize.Attributes<CusAttributes>;

// 实例类声明
export type Instance = superSequelize.Instance<CusAttributes>;

export const defineAttributes: superSequelize.DefineAttributes = {
  ...ModelBizAttributes,
  username: {
    type: Sequelize.STRING(32),
    allowNull: false,
    comment: '应用的唯一key',
    validate: {
      is: reg.username,
    },
    allowUpdate: false,
  },
  nickname: {
    type: Sequelize.STRING(32),
    allowNull: true,
    defaultValue: '',
    comment: '昵称',
  },
  password: {
    type: Sequelize.STRING(64),
    allowNull: false,
    comment: '密码',
  },
  headImageUrl: {
    type: Sequelize.STRING(256),
    allowNull: true,
    defaultValue:'',
    comment: '头像地址',
    validate: {
      is: reg.url,
    },
  },
};

export default (app: Application) => {
  const { model } = app;
  // todo 无法使用app.utils
  return model.define<Instance, Attributes>('user', defineAttributes, {
    freezeTableName: true,
    indexes: [
      {
        unique: true,
        fields: ['username'],
      },
    ],
  });
};
