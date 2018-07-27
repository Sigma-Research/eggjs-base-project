// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import AuthLogin from '../../../app/middleware/authLogin';
import ResponseTime from '../../../app/middleware/responseTime';

declare module 'egg' {
  interface IMiddleware {
    authLogin: typeof AuthLogin;
    responseTime: typeof ResponseTime;
  }
}
