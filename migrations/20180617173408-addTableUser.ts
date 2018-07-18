'use strict';
import * as sequelize from 'sequelize';
import ModelBizAttributes from '../app/core/base/modelBizAttributes';
module.exports = {
  async up(queryInterface: sequelize.QueryInterface, sequelize: sequelize.SequelizeStatic) {
    return [
      await queryInterface.createTable('user', {
        ...ModelBizAttributes,
        username: {
          type: sequelize.STRING(32),
          allowNull: false,
          comment: '应用的唯一key',
        },
        nickname: {
          type: sequelize.STRING(32),
          allowNull: false,
          defaultValue: '',
          comment: '昵称',
        },
        password: {
          type: sequelize.STRING(64),
          allowNull: false,
          defaultValue: '',
          comment: '密码',
        },
        headImageUrl: {
          type: sequelize.STRING(256),
          allowNull: true,
          comment: '头像地址',
        },
      }),
      await queryInterface.addIndex('user', ['username'], {
        indicesType: 'UNIQUE',
      })];
  },

  down(queryInterface: sequelize.QueryInterface) {
    return queryInterface.dropTable('user');
  },
};
