/**
 * @file 用户表
 * @author zengbaoqing<misterapptracy@gmail.com>
 * @desc  allowUpdate 在 sequlize基础上新增的字段，在更新的时候默认删除allowUpdate===false的字段
 * @desc  避免不必要的问题产生 默认为true
 */
'use strict';
import { Application } from 'egg';
import superMongoose from '../core/base/typings/modelService';
import bizAttributes from '../core/base/modelBizAttributes';

export interface CusAttributes {
  username: string;
  nickname?: string;
  password: string;
  headImageUrl?: string;
}
// 字段声明
export type Attributes = superMongoose.Attributes<CusAttributes>;

export const schema:superMongoose.SchemaAttributes = {
  username: {
    type: String,
    comment: '应用的唯一key',
    unique:true,
    trim:true,
  },
  nickname: {
    type: String,
    comment: '昵称',
    trim:true,
  },
  password: {
    type: String,
    comment: '密码',
    trim:true,
  },
  headImageUrl: {
    type: String,
    comment: '头像地址',
    trim:true,
  },
  ...bizAttributes,
};

export default (app:Application) => {
  const { mongoose } = app;
  return mongoose.model<superMongoose.Document<Attributes>>('user', new mongoose.Schema(schema));
};
