const cookieParser = require('cookie-parser');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 302,
    credentials: true
  };
  app.enableCors(options);
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
