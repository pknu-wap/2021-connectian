import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FirestoreStore } from '@google-cloud/connect-firestore';
import { ConfigService } from '@nestjs/config';
import { AsyncApiDocumentBuilder, AsyncApiModule } from 'nestjs-asyncapi';

async function bootstrap() {
  console.time(`NEST_LOAD_IN`);
  const firebase = admin.initializeApp({
    credential: admin.credential.cert(
      join(__dirname, '..', 'serviceAccountKey.json'),
    ),
    databaseURL:
      'https://wap-connectian-default-rtdb.asia-southeast1.firebasedatabase.app',
  });
  console.log(`firebase sdk: ${firebase.name}`);
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
  const configService = app.get(ConfigService);
  SwaggerModule.setup(
    '/api',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('CONNECTIAN')
        .setDescription('CONNECTIAN 2021')
        .setVersion('1.0')
        .setExternalDoc('웹소켓 API', '/api/events')
        .build(),
    ),
  );
  await AsyncApiModule.setup(
    '/api/events',
    app,
    AsyncApiModule.createDocument(
      app,
      new AsyncApiDocumentBuilder()
        .setTitle('CONNECTIAN-ASYNC')
        .setDescription('Event-Driven Websocket API DOCs')
        .setVersion('1.0')
        .build(),
    ),
  );
  app.use(
    session({
      secret: configService.get<string>('SESSION_SECRET'),
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 6,
      },
      resave: false,
      saveUninitialized: false,
      store: new FirestoreStore({
        kind: 'express-session',
        dataset: firebase.firestore(),
      }),
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(configService.get<number>('PORT') || 3000, '0.0.0.0');
}

bootstrap().then(() => console.timeEnd(`NEST_LOAD_IN`));
