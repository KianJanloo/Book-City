import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as passport from 'passport';
import * as session from 'express-session';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(
    session({
      secret: 'SECRETIANOINOSECURE',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.use(passport.initialize());
  app.use(passport.session());

  const port = process.env.PORT || 3000;
  await app.listen(port);
}
bootstrap();
