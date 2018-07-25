/**
 * @file 表通用字段
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import * as sequelize from 'sequelize';
import superSequelize from '../base/typings/modelService';

const bizAttributes: superSequelize.DefineAttributes = {
  id: {
    type: sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键',
    allowUpdate: false,
  },
  updateTime: {
    type: sequelize.DATE(3),
    allowNull: false,
    comment: '更新时间',
    defaultValue: sequelize.NOW,
  },
  createTime: {
    type: sequelize.DATE(3),
    allowNull: false,
    comment: '创建时间',
    defaultValue: sequelize.NOW,
  },
  isDel: {
    type: sequelize.BIGINT(16),
    allowNull: true,
    defaultValue:0,
    comment: '用于逻辑删除',
  },
};
export default bizAttributes;
