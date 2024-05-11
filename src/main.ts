import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as dotenv from "dotenv";
import { ENV_PATH } from './Utils/Path';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { createServer } from 'http';
import { SocketService } from './Socket';

dotenv.config({ path: ENV_PATH });
const PORT = Number(process.env.PORT);

async function bootstrap() {

 
  const app = express();

  const nestApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(app),
    { logger: false }
  );

  
  nestApp.enableShutdownHooks();
  nestApp.enableCors();
  nestApp.useGlobalPipes(new ValidationPipe());
  nestApp.init();

  const httpServer = createServer(app);
  const socketService = nestApp.get(SocketService);

  socketService.createServer(httpServer);

  // Define rooms here

  await socketService.listen(PORT);
  console.log(`Application running [PORT:${PORT}]`);

}

bootstrap();
