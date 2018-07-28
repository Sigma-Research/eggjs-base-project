/**
 * @file service model基类
 * @author guxiang <gavingu12@gmail.com>
 */
'use strict';
import { Context, Service } from 'egg';
import superMongoose from './typings/modelService';

export default abstract class ModelService<TAttributes> extends Service {
  // TAttributes 是完整参数
  constructor(ctx: Context, public model: superMongoose.Instance<TAttributes>, public schema: superMongoose.SchemaAttributes) {
    super(ctx);
  }

  public count(whereOpt:superMongoose.GetOneOptions) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    return this.model.count(whereOpt);
  }

  public create(option:object) {
    return this.model.create(option);
  }

  public bulkCreate(list:object[]) {
    return this.model.insertMany(list);
  }

  public aggregate(aggregations:object[]) {
    return this.model.aggregate(aggregations);
  }

  public getOne(whereOpt:superMongoose.GetOneOptions, attributes?:string[]) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
	  return this.model.findOne(whereOpt, attributes);
  }

  public getAll(whereOpt:superMongoose.GetOneOptions, attributes?:string[]) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
	  return this.model.find(whereOpt, attributes);
  }

  public getList(options:superMongoose.GetListOptions) {
    const {  where, attributes } = options;
    let { page, pageSize } = options;
    if (where.isDel !== 1) {
      where.isDel = 0;
    }
    page = page && page > 1 ? page :1;
    pageSize = pageSize && pageSize > 0 ? pageSize : 10;
    return this.model.find(where, attributes).skip((page - 1) * pageSize).limit(pageSize);
  }

  public update(whereOpt:superMongoose.GetOneOptions, option:object) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    return this.model.update(whereOpt, { $set: option }, { safe: true });
  }

  public delete(whereOpt:superMongoose.GetOneOptions) {
    whereOpt.isDel = 0;
    return this.model.update(whereOpt, { $set: { available: 0 } });
  }
}
