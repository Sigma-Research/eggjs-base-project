// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import { EggAppConfig } from 'egg';
import * as ExportConfigDefault from '../../config/config.default';
type ConfigDefault = typeof ExportConfigDefault;
type NewEggAppConfig = EggAppConfig & ConfigDefault;

declare module 'egg' {
  interface Application {
    config: NewEggAppConfig;
  }

  interface Controller {
    config: NewEggAppConfig;
  }

  interface Service {
    config: NewEggAppConfig;
  }
}