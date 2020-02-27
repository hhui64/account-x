import { Module, CacheModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './modules/common/common.module'
import { AuthserverModule } from './modules/authserver/authserver.module'
import { SessionserverModule } from './modules/sessionserver/sessionserver.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from './modules/config/config.module'
import * as redisStore from 'cache-manager-redis-store'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CommonModule,
    AuthserverModule,
    SessionserverModule,
    TypeOrmModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: 'localhost',
      port: 6379,
      ttl: 30, // 缓存有效时间
      max: 10,
    }),
    ConfigModule,
  ],
})
export class AppModule {}
