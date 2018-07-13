/**
 * @file service 基类
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import { Context, Service } from 'egg';
import * as sequelize from 'sequelize';
import * as superSequelize from './typings/modelService';

export default class ModelService<TInstance, TAttributes> extends Service {

  // TAttributes 是完整参数
  // superSequelize.Attributes<TAttributes> 是TAttributes & BizAttributes
  constructor(ctx: Context, public model: sequelize.Model<TInstance, TAttributes>, public schema: superSequelize.DefineAttributes) {
    super(ctx);
    this.model = model;
  }

  async create(values?: TAttributes, options?: sequelize.CreateOptions) {
    return this.model.create(values, options);
  }

  async bulkCreate(records: TAttributes[], options?: sequelize.BulkCreateOptions) {
    return this.model.bulkCreate(records, options);
  }

  async getOneOrCreate(options: superSequelize.GetOneOrInitializeOptions<superSequelize.Attributes<TAttributes>>) {
    if (options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    if (options.defaults) {
      options.defaults.isDel = null;
    }
    return this.model.findOrCreate(options);
  }

  // sequelize.FindOptions<TAttributes & BizAttributes>
  async getOne(options?: superSequelize.GetOneOptions<superSequelize.Attributes<TAttributes>>) {
    if (options && options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    return this.model.findOne<superSequelize.Attributes<TAttributes>>(options);
  }

  async getList(options: superSequelize.GetListOptions<superSequelize.Attributes<TAttributes>> = {}) {
    if (options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    const page = options.page && options.page >= 1 ? options.page : 1;
    const pageSize = options.pageSize && options.pageSize > 0 ? (options.pageSize > 1000 ? 1000 : options.pageSize) : 10;
    options.offset = (page - 1) * pageSize;
    options.limit = pageSize;
    return this.model.findAll<superSequelize.Attributes<TAttributes>>(options);
  }

  async update(values: Partial<superSequelize.Attributes<TAttributes>>, options: superSequelize.UpdateOptions<superSequelize.Attributes<TAttributes>>) {
    if (options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    Object.keys(values).forEach((key) => {
      if ((this.schema[key] && this.schema[key].allowUpdate === false) || values[key] === undefined || this.schema[key] === undefined) {
        delete values[key];
      }
    });
    values.updateTime = +new Date();
    return this.model.update(values, options);
  }

  // 逻辑删除的数据不能再修改
  async delete(options: superSequelize.UpdateOptions<superSequelize.Attributes<TAttributes>>) {
    const values: Partial<superSequelize.Attributes<TAttributes>> = {};
    if (options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    values.isDel = +new Date();
    return this.model.update(values, options);
  }

  // 停用
  async disable(options: superSequelize.UpdateOptions<superSequelize.Attributes<TAttributes>>) {
    const values: Partial<superSequelize.Attributes<TAttributes>> = {};
    if (options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    values.updateTime = +new Date();
    values.isActive = 0;
    return this.model.update(values, options);
  }

  // 启用
  async enable(options: superSequelize.UpdateOptions<superSequelize.Attributes<TAttributes>>) {
    const values: Partial<superSequelize.Attributes<TAttributes>> = {};
    if (options.where && !options.where.isDel) {
      options.where.isDel = { [sequelize.Op.is]: null };
    }
    values.updateTime = +new Date();
    values.isActive = 1;
    return this.model.update(values, options);
  }
}