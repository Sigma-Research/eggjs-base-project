/**
 * @file service 基类
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

const { Service } = require('egg');
class BaseService extends Service {

  constructor(ctx, Model) {
    super(ctx);
    this.Model = Model;
  }

  async create(option) {
    return await this.Model.create(option);
  }

  async bulkCreate(list) {
    return await this.Model.bulkCreate(list);
  }

  async getOne(whereOpt, attributes) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    const opt = {
      where: whereOpt
    };
    if (attributes && attributes.constructor === Array) {
      opt.attributes = attributes;
    }
    return await this.Model.findOne(opt);
  }

  async getList(whereOpt, attributes = '*', page, pageSize) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    const opt = {
      where: whereOpt
    };
    if (attributes && attributes.constructor === Array) {
      opt.attributes = attributes;
    }
    if (page >= 1) {
      pageSize = pageSize > 0 ? pageSize : 10;
      whereOpt.offset = (page - 1) * pageSize;
      whereOpt.limit = pageSize;
    }
    return await this.Model.findAll(opt);
  }

  async update(option, whereOpt) {
    whereOpt.isDel = 0;
    Object.keys(option).forEach(key => {
      if (this.Model.schema[key] && this.Model.schema[key].allowUpdate === false) {
        delete option[key];
      }
    });
    return await this.Model.update(option, { where: whereOpt });
  }

  async delete(whereOpt) {
    return await this.Model.update({ isDel: 1 }, { where: whereOpt });
  }

}

module.exports = BaseService;
