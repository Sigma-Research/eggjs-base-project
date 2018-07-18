import Reg from "../app/core/utils/reg"

declare module 'egg' {
    interface Application {
        utils: {
            reg
        },
        userId?: string,
    }
}