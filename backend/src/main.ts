import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { join } from 'path';
import { VersioningType } from '@nestjs/common';

const port = parseInt(process.env['PORT']) | 3000;
async function bootstrap() {
  console.time(`NEST_LOAD_IN_PORT_${port}`);
  const firebaseName = admin.initializeApp({
    credential: admin.credential.cert(
      join(__dirname, '..', 'serviceAccountKey.json'),
    ),
  }).name;
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(port);
  console.log(`firebase sdk: ${firebaseName}`);
}
bootstrap().then(() => console.timeEnd(`NEST_LOAD_IN_PORT_${port}`));
