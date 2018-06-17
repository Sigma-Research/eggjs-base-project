/**
 * @file user service
 * @author zengbaoqing<misterapptracy@gmail.com>
 */

'use strict';
import ModelService from '../core/base/modelService';
import { Attribute, defineAttributes, Instance } from '../model/user';

export default class UserService extends ModelService<Instance, Attribute> {
  constructor(ctx) {
    super(ctx, ctx.app.model.User, defineAttributes);
  }
}
