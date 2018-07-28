/**
 * @file 表通用字段
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import superMongoose from './typings/modelService';

const bizAttributes: superMongoose.SchemaAttributes = {
  updateTime: {
    type: Date,
    comment: '更新时间',
    default: Date.now,
  },
  createTime: {
    type: Date,
    comment: '创建时间',
    default: Date.now,
  },
  isDel: {
    type: Number,
    default:0,
    comment: '用于逻辑删除',
  },
};

export default bizAttributes;
