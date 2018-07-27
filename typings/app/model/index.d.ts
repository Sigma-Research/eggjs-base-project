// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import User from '../../../app/model/user';

declare module 'mongoose' {
  interface Mongoose {
    User: ReturnType<typeof User>;
  }
}
