/**
 * @file 默认配置文件（环境配置优化此配置）
 * @author zengbaoqing<misterapptracy@gmail.com>
 */
'use strict';
import {
  EggAppConfig,
  EggAppInfo,
  PowerPartial,
} from 'egg';

// for config.{env}.ts
export type DefaultConfig = PowerPartial<EggAppConfig & BizConfig>;

// app special config scheme
export interface BizConfig {
  sourceUrl: string;
  scheduleLockKey: { [name: string]: string };
}

module.exports = (appInfo: EggAppInfo) => {
  const config: PowerPartial<EggAppConfig> & BizConfig = {
    sourceUrl: `https://github.com/Sigma-Research/${appInfo.name}`,
    // egg schedule 的锁状态
    scheduleLockKey: {
      clearLogFile: 'lock:schedule:clear:log:file',
    },
    cluster: {
      listen: {
        port: 8010,
      },
    },
    keys: 'LKHLKLHKLH^&*453699!!@@##SADASDIIsadolchenyu)',
    // 日志配置
    logger: {
      dir: '../logs',
      consoleLevel: 'DEBUG',
    },
    // 中间件配置,决定顺序
    middleware: ['responseTime'],
    security: {
      xframe: {
        enable: false,
      },
      csrf: {
        enable: false,
        // ignore: ctx => /^(172|127|192)/i.test(ctx.ip)
      },
    },
    session: {
      key: 'MANHATTAN_SESS',
      maxAge: 24 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: true,
    },
    onerror: {
      all(err, ctx) {
        // 在此处定义针对所有响应类型的错误处理方法
        // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
        // 所有其他错误都status 1005 返回
        // 其他的返回状态码不要覆盖1005
        ctx.body = {
          status: 1005,
          statusInfo: err.message || '未知错误',
        };
        ctx.status = 200;
      },
    },
    multipart: {
      fieldSize: 2 * 1024 * 1024,
      fields: 30,
    },
    bodyParser: {
      jsonLimit: '10mb',
      formLimit: '10mb',
      enable: true,
      encoding: 'utf8',
      strict: true,
      queryString: {
        arrayLimit: 2000,
        depth: 10,
        parameterLimit: 2000,
      },
    },
  };
  return config;
};
