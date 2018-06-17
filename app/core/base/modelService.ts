/**
 * @file service 基类
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import { Context, Service } from 'egg';
import * as sequelize from 'sequelize';
import * as superSequelize from './typings/modelService';

// special whereOpt scheme
export interface BizAttributes {
  updateTime?: number;
  createTime?: number;
  isDel?: number;
}

export default class ModelService<TInstance, TAttributes> extends Service {

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

  // sequelize.FindOptions<TAttributes & BizAttributes>
  async getOne(options?: superSequelize.GetOneOptions<TAttributes & BizAttributes>) {
    if (options && options.where && options.where.isDel !== 1) {
      options.where.isDel = 0;
    }
    return this.model.findOne<BizAttributes>(options);
  }

  async getList(options: superSequelize.GetListOptions<TAttributes & BizAttributes> = {}) {
    if (options.where && options.where.isDel !== 1) {
      options.where.isDel = 0;
    }
    const page = options.page && options.page >= 1 ? options.page : 1;
    const pageSize = options.pageSize && options.pageSize > 0 ? options.pageSize : 10;
    options.offset = (page - 1) * pageSize;
    options.limit = pageSize;
    return this.model.findAll<BizAttributes>(options);
  }

  async update(values: Partial<TAttributes>, options: superSequelize.UpdateOptions<BizAttributes>) {
    if (options.where) {
      options.where.isDel = 0;
    }
    Object.keys(values).forEach((key) => {
      if (this.schema[key] && this.schema[key].allowUpdate === false) {
        delete values[key];
      }
    });
    return this.model.update(values, options);
  }

  async delete(options: superSequelize.UpdateOptions<BizAttributes>) {
    const values: Partial<TAttributes & BizAttributes> = {};
    values.isDel = 1;
    return this.model.update(values, options);
  }

}
