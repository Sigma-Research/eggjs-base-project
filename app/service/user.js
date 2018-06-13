/**
 * @file user service
 * @author zengbaoqing<misterapptracy@gmail.com>
 */

'use strict';
const ModelService = require('../core/base/modelService');

class UserService extends ModelService {
  constructor(ctx) {
    super(ctx, ctx.app.model.User);
  }
}

module.exports = UserService;