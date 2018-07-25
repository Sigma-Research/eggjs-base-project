/**
 * @file service 基类
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

const { Service } = require('egg');
class ModelService extends Service {

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

  async getOne({ where, attributes }) {
    if (where.isDel !== 1) {
      where.isDel = 0;
    }
    const opt = {
      where
    };
    if (attributes && attributes.constructor === Array) {
      opt.attributes = attributes;
    }
    return await this.Model.findOne(opt);
  }

  async getList({ where, attributes = '*', page, pageSize }) {
    if (where.isDel !== 1) {
      where.isDel = 0;
    }
    const opt = {
      where
    };
    if (attributes && attributes.constructor === Array) {
      opt.attributes = attributes;
    }
    if (page >= 1) {
      pageSize = pageSize > 0 ? pageSize : 10;
      where.offset = (page - 1) * pageSize;
      where.limit = pageSize;
    }
    return await this.Model.findAll(opt);
  }

  async update(option, whereOpt) {
    whereOpt.isDel = 0;
    Object.keys(option).forEach(key => {
      if (this.Model.attributes[key] && this.Model.attributes[key].allowUpdate === false) {
        delete option[key];
      }
    });
    return await this.Model.update(option, { where: whereOpt });
  }

  async delete(whereOpt) {
    return await this.Model.update({ isDel: +new Date() }, { where: whereOpt });
  }

}

module.exports = ModelService;
