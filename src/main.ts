const cookieParser = require('cookie-parser');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
