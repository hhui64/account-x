import { Module, CacheModule } from '@nestjs/common'
import { SessionserverController } from './sessionserver.controller'
import { SessionserverService } from './sessionserver.service'
import * as redisStore from 'cache-manager-redis-store'

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 30, // 缓存有效时间
      max: 10,
    }),
  ],
  controllers: [SessionserverController],
  providers: [SessionserverService],
})
export class SessionserverModule {}
