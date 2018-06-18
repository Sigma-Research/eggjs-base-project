import Reg from "../app/core/utils/reg"

declare module 'egg' {
    interface Application {
        utils: {
            reg: Reg
        },
        userId?: string,
    }
}