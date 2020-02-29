import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CommonModule } from './modules/common/common.module'
import { ConfigModule } from './modules/config/config.module'
import { AuthserverModule } from './modules/authserver/authserver.module'
import { SessionserverModule } from './modules/sessionserver/sessionserver.module'
import { WebapiModule } from './modules/webapi/webapi.module'
import { CacheManagerModule } from './modules/cache/cache-manager.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule,
    CommonModule,
    AuthserverModule,
    SessionserverModule,
    WebapiModule,
    CacheManagerModule,
  ],
})
export class AppModule {}
