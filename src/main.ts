const cookieParser = require('cookie-parser');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = {
    origin: process.env.SERVER_CORS,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  };
  app.use(require('cors')({origin: process.env.SERVER_CORS, credentials: true, optionSuccessStatus: 200, headers: "Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, Accept, Authorization"}));
  app.enableCors(options);
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
