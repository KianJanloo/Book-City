import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './strategies/auth.strategy';
import { LoggerMiddleware } from './logger/logger.middleware';
import { EmailService } from './email/email.service';
import { Code } from './entities/codes.entity';
import { ProductsModule } from './products/products.module';
import { FavoritesModule } from './favorites/favorites.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ContactModule } from './contact/contact.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TypeOrmModule.forFeature([Code]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'book-city.onrender',
      port: 5432,
      username: 'postgres',
      password: '1388ki8831',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    FavoritesModule,
    DashboardModule,
    ContactModule,
    CartModule,
    OrdersModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, EmailService],
  exports: [EmailService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
