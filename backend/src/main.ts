import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { VersioningType } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as session from 'express-session';

const port = parseInt(process.env['PORT']) | 3000;

async function bootstrap() {
  console.time(`NEST_LOAD_IN_PORT_${port}`);
  const firebaseName = admin.initializeApp({
    credential: admin.credential.cert(
      join(__dirname, '..', 'serviceAccountKey.json'),
    ),
    databaseURL:
      'https://wap-connectian-default-rtdb.asia-southeast1.firebasedatabase.app',
  }).name;
  console.log(`firebase sdk: ${firebaseName}`);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.useWebSocketAdapter(new IoAdapter(app));
  app.use(
    session({
      secret: process.env['SESSION_SECRET'],
      resave: false,
      saveUninitialized: false,
    }),
  );
  await app.listen(port, '0.0.0.0');
}

bootstrap().then(() => console.timeEnd(`NEST_LOAD_IN_PORT_${port}`));
