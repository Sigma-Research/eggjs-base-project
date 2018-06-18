/**
 * @file user service
 * @author zengbaoqing<misterapptracy@gmail.com>
 */

'use strict';
import { Context } from 'egg';
import ModelService from '../core/base/modelService';
import { Attributes, defineAttributes, Instance } from '../model/user';

export default class UserService extends ModelService<Instance, Attributes> {
  constructor(ctx: Context) {
    super(ctx, ctx.app.model.User, defineAttributes);
  }
}
