import * as IORedis from "ioredis"
// TODO 向ts-helper增加CusCommand的自动生成代码
interface CusCommand {
    isGlobalLock(key: string, callback: (err: Error, res: number) => void): void;
    isGlobalLock(key: string): Promise<number>;
}
declare module 'egg' {
    interface Application {
        redis: IORedis.Redis & CusCommand
    }
}