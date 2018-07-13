import * as Sequelize from 'sequelize';
import * as superSequelize from '../base/typings/modelService';
const bizAttributes: superSequelize.DefineAttributes = {
  id: {
    type: Sequelize.INTEGER(11),
    primaryKey: true,
    autoIncrement: true,
    comment: '自增主键',
    allowUpdate: false,
  },
  updateTime: {
    type: Sequelize.DATE(3),
    allowNull: false,
    defaultValue: Sequelize.NOW,
    comment: '更新时间',
  },
  createTime: {
    type: Sequelize.DATE(3),
    allowNull: false,
    defaultValue: Sequelize.NOW,
    comment: '创建时间',
  },
  isActive: {
    type: Sequelize.TINYINT(1),
    allowNull: false,
    defaultValue: 1,
    comment: '是否为活跃状态',
  },
  isDel: {
    type: Sequelize.DATE(3),
    allowNull: true,
    comment: '用于逻辑删除',
  },
};
export default bizAttributes;
