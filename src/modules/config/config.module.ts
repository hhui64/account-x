import { Module, Global } from '@nestjs/common'
import { ConfigService } from './config.service'
import { ConfigFromDatabaseService } from './config-from-database.service'
import { Config } from 'src/entities/config.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Config])],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`${process.env.NODE_ENV || 'development'}.env`),
    },
    ConfigFromDatabaseService,
  ],
  exports: [ConfigService, ConfigFromDatabaseService, TypeOrmModule],
})
export class ConfigModule {}
