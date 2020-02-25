import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ConfigService } from './modules/config/config.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(app.get(ConfigService).get('APP_PORT'))
}

bootstrap()
