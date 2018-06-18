import * as IORedis from "ioredis"
interface CusCommand {
    isGlobalLock(key: string, callback: (err: Error, res: number) => void): void;
    isGlobalLock(key: string): Promise<number>;
}
declare module 'egg' {
    interface Application {
        redis: IORedis.Redis & CusCommand
    }
}