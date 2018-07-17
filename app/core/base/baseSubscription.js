/**
 * @file 计时器扩展类
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

const { Subscription } = require('egg');
class BaseSubscription extends Subscription {

  constructor(ctx, lockType, lock) {
    super(ctx);
    this.lockType = lockType;
    // lock必须是一个对象如:{isLock:false}
    this.lock = lock;
  }

  async start() {
    // 单进程异步函数
  }

  async subscribe() {
    // 真正执行的定时函数
    const { redis } = this.app;
    let isGlobalLock = 0;
    switch (this.lockType) {
      case 'process':
        // 锁类型为进程锁时，保证worker内串行，不保证多节点下串行
        if (this.lock.isLock) {
          return;
        }
        this.lock.isLock = true;
        await this.start();
        this.lock.isLock = false;
        break;
      case 'global':
        // 锁类型为全局锁，保证多节点部署下的单worker串行
        isGlobalLock = await redis.isGlobalLock(this.lock);
        if (isGlobalLock) {
          return;
        }
        await this.start();
        await redis.set(this.lock, 0);
        break;
      default:
        // 无锁状态，不保证任何串行
        await this.start();
        break;
    }
  }
}

module.exports = BaseSubscription;
