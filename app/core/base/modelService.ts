/**
 * @file service model基类
 * @author zengbaoqing <misterapptracy@gmail.com>
 * @desc 为了返回Promise对象需要做不一样的处理
 */
'use strict';
import { Context, Service } from 'egg';
import superMongoose from './typings/modelService';

export default abstract class ModelService<TAttributes> extends Service {
  // TAttributes 是完整参数
  constructor(ctx: Context, public model: superMongoose.Instance<TAttributes>, public schema: superMongoose.SchemaAttributes) {
    super(ctx);
  }

  public async count(whereOpt:superMongoose.GetOneOptions) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    const count:number = await this.model.count(whereOpt);
    return Promise.resolve(count);
  }

  public create(option:object) {
    return this.model.create(option);
  }

  public bulkCreate(list:object[]) {
    return this.model.insertMany(list);
  }

  public aggregate(aggregations:object[]) {
    // 需要在此返回Promise类型
    return this.model.aggregate(aggregations, () => {});
  }

  public async getOne(whereOpt:superMongoose.GetOneOptions, attributes?:string[]) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    const data:TAttributes|null = await this.model.findOne(whereOpt, attributes);
    return Promise.resolve(data);
  }

  public async getAll(whereOpt:superMongoose.GetOneOptions, attributes?:string[]) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    const list:TAttributes[] = await this.model.find(whereOpt, attributes);
    return Promise.resolve(list);
  }

  public async getList(options:superMongoose.GetListOptions) {
    const { where, attributes } = options;
    let { page, pageSize } = options;
    if (where.isDel !== 1) {
      where.isDel = 0;
    }
    page = page && page > 1 ? page :1;
    pageSize = pageSize && pageSize > 0 ? pageSize : 10;
    const list:TAttributes[] = await this.model.find(where, attributes).skip((page - 1) * pageSize).limit(pageSize);
    return Promise.resolve(list);
  }

  public async update(whereOpt:superMongoose.GetOneOptions, option:object) {
    if (whereOpt.isDel !== 1) {
      whereOpt.isDel = 0;
    }
    const rawResponse = await this.model.update(whereOpt, { $set: option }, { safe: true });
    return Promise.resolve(rawResponse);
  }

  public async delete(whereOpt:superMongoose.GetOneOptions) {
    whereOpt.isDel = 0;
    await this.model.update(whereOpt, { $set: { available: 0 } });
    return Promise.resolve(null);
  }
}
