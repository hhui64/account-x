import * as express from 'express'
import { NestExpressApplication, ExpressAdapter } from '@nestjs/platform-express'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './modules/config/config.service'

async function bootstrap() {
  const server = express()
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(server))
  await app.listen(app.get(ConfigService).get('APP_PORT'))
}

bootstrap()
