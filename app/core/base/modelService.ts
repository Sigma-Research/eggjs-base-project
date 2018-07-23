/**
 * @file service model基类
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import { Context, Service } from 'egg';
import * as sequelize from 'sequelize';
import superSequelize from './typings/modelService';

export default abstract class ModelService<TInstance, TAttributes> extends Service {

  // TAttributes 是完整参数
  // superSequelize.Attributes<TAttributes> 是TAttributes & BizAttributes
  constructor(ctx: Context, public model: sequelize.Model<TInstance, TAttributes>, public schema: superSequelize.DefineAttributes) {
    super(ctx);
  }

  public create(values?: TAttributes, options?: sequelize.CreateOptions) {
    return this.model.create(values, options);
  }

  public bulkCreate(records: TAttributes[], options?: sequelize.BulkCreateOptions) {
    return this.model.bulkCreate(records, options);
  }

  // sequelize.FindOptions<TAttributes & BizAttributes>
  public getOne(options: superSequelize.GetOneOptions<superSequelize.Attributes<TAttributes>> = {}) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    return this.model.findOne<superSequelize.Attributes<TAttributes>>(options);
  }

  public async exists(options: superSequelize.GetOneOptions<superSequelize.Attributes<TAttributes>> = {}) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    const data = await this.model.findOne<superSequelize.Attributes<TAttributes>>(options);
    return !!data;
  }
  public getList(options: superSequelize.GetListOptions<superSequelize.Attributes<TAttributes>> = {}) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    const page = options.page && options.page >= 1 ? options.page : 1;
    const pageSize = options.pageSize && options.pageSize > 0 ? (options.pageSize > 1000 ? 1000 : options.pageSize) : 10;
    options.offset = (page - 1) * pageSize;
    options.limit = pageSize;
    return this.model.findAll<superSequelize.Attributes<TAttributes>>(options);
  }

  public getAll(options: superSequelize.GetListOptions<superSequelize.Attributes<TAttributes>> = {}) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    return this.model.findAll<superSequelize.Attributes<TAttributes>>(options);
  }

  public update(values: Partial<superSequelize.Attributes<TAttributes>>, options: superSequelize.UpdateOptions<superSequelize.Attributes<TAttributes>>) {
    if (!options.where) {
      options.where = {};
    }
    options.where.isDel = 0;
    Object.keys(values).forEach((key) => {
      if ((this.schema[key] && this.schema[key].allowUpdate === false)
        || values[key] === undefined
        || this.schema[key] === undefined) {
        delete values[key];
      }
    });
    return this.model.update(values, options);
  }

  // 逻辑删除的数据不能再修改
  public delete(options: superSequelize.UpdateOptions<superSequelize.Attributes<TAttributes>>) {
    const values: Partial<superSequelize.Attributes<TAttributes>> = {};
    if (!options.where) {
      options.where = {};
    }
    values.isDel = +new Date();
    options.where.isDel = 0;
    return this.model.update(values, options);
  }
}
