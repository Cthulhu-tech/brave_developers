const cookieParser = require('cookie-parser');
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
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
