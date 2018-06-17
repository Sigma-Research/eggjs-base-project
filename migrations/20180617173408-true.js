'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [queryInterface.createTable('user', {
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
    }), queryInterface.addIndex('user', {
      unique: true,
      fields: ['username'],
    })]
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('user');
  }
};