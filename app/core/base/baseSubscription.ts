/**
 * @file 计时器扩展类
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';

import { Context, Subscription } from 'egg';

export default class BaseSubscription extends Subscription {

  public lockType: string;
  public lockKey: string;
  public lock: {
    isLock: boolean,
  };

  constructor(ctx: Context, ...arg) {
    super(ctx);
    this.lockType = arg[0];
    if (this.lockType === 'global') {
      this.lockKey = arg[1];
    } else if (this.lockType === 'process') {
      this.lock = arg[1];
    }
  }

  async start() {
    // 单进程异步函数
  }

  async subscribe() {
    // 真正执行的定时函数
    const { redis, logger } = this.app;
    switch (this.lockType) {
      case 'process':
        // 锁类型为进程锁时,保证worker内串行,不保证多节点下串行
        if (this.lock.isLock) {
          return;
        }
        this.lock.isLock = true;
        try {
          await this.start();
        } catch (e) {
          logger.error(e);
        } finally {
          this.lock.isLock = false;
        }
        break;
      case 'global':
        // 锁类型为内存锁时,保证多节点下所有worker串行,相当于egg内置的type选项失效
        if (await redis.isGlobalLock(this.lockKey)) {
          return;
        }
        await this.start();
        await redis.set(this.lockKey, 0);
        break;
      default:
        // 锁类型为空时,没有进程锁和内存,不保证任何串行
        await this.start();
        break;
    }
  }
}
