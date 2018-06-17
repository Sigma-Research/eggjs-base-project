/**
 * @file 删除日志文件
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import * as dateformat from 'dateformat';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as rimraf from 'rimraf';
import BaseSubscription from '../core/base/baseSubscription';
// 考试过期时间
const EXPIRE_DURATION = 5 * 24 * 60 * 60 * 1000;

export default class ClearLogFile extends BaseSubscription {
  constructor(ctx) {
    super(ctx, 'global', ctx.app.config.scheduleLockKey.clearLogFile);
  }
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  static get schedule() {
    return {
      cron: '0 0 3 * * *', // 每天凌晨三点执行
      // interval: '1s',
      type: 'worker',
      disable: false,
    };
  }

  // start 是真正定时任务执行时被运行的函数
  async start() {
    const { config, logger } = this;
    const { dir, appLogName, coreLogName, agentLogName, errorLogName } = config.logger;
    const isLogReg = new RegExp(`^(${appLogName}|${coreLogName}|${agentLogName}|${errorLogName})`, 'i');
    const files = fs.readdirSync(dir);
    // 删除egg的进程日志
    try {
      rimraf.sync(path.join(os.homedir(), 'logs'));
      logger.info('remove egg cluster log file ok!');
    } catch (e) {
      logger.error('remove egg cluster log  file error :', e);
    }
    if (!files || !files.length) {
      return logger.info('no expire log files!');
    }
    files.forEach((filename) => {
      if (!isLogReg.test(filename)) {
        return;
      }
      const dateTime = filename.replace(isLogReg, '').substr(1, filename.length);
      const expireTime = dateformat(+new Date() - EXPIRE_DURATION, 'yyyy-mm-dd');
      if (!dateTime || dateTime > expireTime) {
        return;
      }
      const filepath = path.join(dir, filename);
      try {
        fs.unlinkSync(filepath);
        logger.info(`delete file ${filepath} ok!`);
      } catch (e) {
        logger.error(`delete file ${filepath} error : `, e);
      }
    });
  }
}
