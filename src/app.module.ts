import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommonModule } from './modules/common/common.module'
import { AuthserverModule } from './modules/authserver/authserver.module'
import { SessionserverModule } from './modules/sessionserver/sessionserver.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from './modules/config/config.module'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    CommonModule,
    AuthserverModule,
    SessionserverModule,
    TypeOrmModule.forRoot(),
    ConfigModule,
  ],
})
export class AppModule {}
