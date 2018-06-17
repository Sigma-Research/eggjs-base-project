import * as redis from "egg-redis"
import Reg from "../app/core/utils/reg"

declare module 'egg' {
    export interface Application {
        redis,
        utils: {
            reg: Reg
        },
        userId
    }
}