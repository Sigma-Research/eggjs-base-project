/**
 * @file user service
 * @author zengbaoqing<misterapptracy@gmail.com>
 */

'use strict';
const BaseService = require('../core/base/service');

class UserService extends BaseService {
  constructor(ctx) {
    super(ctx, ctx.app.model.User);
  }
}

module.exports = UserService;