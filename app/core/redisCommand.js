/**
 * @file 自定义redis lua命令
 * @author zengbaoqing<misterapptracy@gmail.com>
 * @desc 默认会读取./lua 下的所有lua文件，请遵从此命名规范{command}.{numberOfKeys}.lua
 */
'use strict';

const fs = require('fs');
const path = require('path');
const commandDir = path.join(__dirname, './lua');
const files = fs.readdirSync(commandDir);
module.exports = app => {
  const { redis } = app;
  files.forEach(filename => {
    if (!/.*.lua$/i.test(filename)) {
      return;
    }
    const [ command, numberOfKeys, ] = filename.split('.');
    const script = fs.readFileSync(`${commandDir}/${filename}`, 'utf8');
    redis.defineCommand(command, {
      numberOfKeys: parseInt(numberOfKeys),
      lua: script,
    });
  });
};
