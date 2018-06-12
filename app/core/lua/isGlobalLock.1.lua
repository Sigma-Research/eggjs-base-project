local lockKey = KEYS[1]
if(redis.call("get", lockKey) == "1")
-- 如果没有lockKey或lockKey是0则认为无锁，并加锁
-- 如果lockKey是1则认为有锁
then
    return 1
else
    redis.call("set", lockKey, 1)
    return 0
end