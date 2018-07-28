/**
 * @file modelService接口定义
 * @author zengbaoqing <misterapptracy@gmail.com>
 */

import * as mongoose from 'mongoose';

// 新接口
declare namespace superMongoose {

  interface SchemaTypeOpts extends mongoose.SchemaTypeOpts<any> {
    allowUpdate?:boolean
  }

  interface SchemaAttributes extends mongoose.SchemaDefinition{
    [name: string]: SchemaTypeOpts;
  }

  type Document<T> = T & mongoose.Document;

  type Instance<T> = mongoose.Model<T & mongoose.Document>;

  // 业务属性
  type Attributes<T> = T&{
    _id?:mongoose.Schema.Types.ObjectId
    updateTime?: mongoose.Schema.Types.Date; // DATETIME我们一般传入 +new Date()时间戳
    createTime?: mongoose.Schema.Types.Date;
    isDel?: number;
  };

  // 业务属性返回值
  type ResponseAttributes<T> = T&{
    _id:string;
    updateTime: string; // DATETIME返回值是string
    createTime: string;
    isDel: number;
  }

  interface AnyOptions {
     [name:string] : any
  }
  interface GetOneOptions extends AnyOptions {
    isDel?:number
  }

  interface GetListOptions {
    where:GetOneOptions,
    page?:number,
    pageSize?:number,
    attributes?:string[],
  }

}

export default superMongoose