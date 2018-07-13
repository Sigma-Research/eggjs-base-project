'use strict';
import bizAttributes from '../app/core/base/modelBizAttributes';
import * as Sequelize from 'sequelize'
module.exports = {
  async up(queryInterface: Sequelize.QueryInterface, Sequelize: Sequelize.SequelizeStatic) {
    return [
      await queryInterface.createTable('user', {
        ...bizAttributes,
        username: {
          type: Sequelize.STRING(32),
          allowNull: false,
          comment: '应用的唯一key',
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
        },
      }),
      await queryInterface.addIndex('user', ['username'], {
        indicesType: 'UNIQUE'
      })];
  },

  down(queryInterface: Sequelize.QueryInterface) {
    return queryInterface.dropTable('user');
  }
}
