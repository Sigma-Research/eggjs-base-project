/**
 * @file 表通用字段
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import superMongoose from './typings/modelService';

const bizAttributes: superMongoose.SchemaAttributes = {
  updateTime: {
    type: Date,
    allowNull: false,
    comment: '更新时间',
    defaultValue: Date.now,
  },
  createTime: {
    type: Date,
    allowNull: false,
    comment: '创建时间',
    defaultValue: Date.now,
  },
  isDel: {
    type: Number,
    allowNull: true,
    defaultValue:0,
    comment: '用于逻辑删除',
  },
};

export default bizAttributes;
