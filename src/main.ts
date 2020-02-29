import * as express from 'express'
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './modules/config/config.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const server = express()
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server))
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(app.get(ConfigService).get('APP_PORT'))
}

bootstrap()
