import { Module, Global, CacheModule } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'

const cacheModuleOptions = {
  store: redisStore,
  host: 'localhost',
  port: 6379,
  ttl: 30,
  max: 10,
}

@Global()
@Module({
  imports: [CacheModule.register(cacheModuleOptions)],
  exports: [CacheModule],
})
export class CacheManagerModule {}
