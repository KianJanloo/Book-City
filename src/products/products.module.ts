import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { UsersModule } from 'src/users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    UsersModule,
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => ({
        store: await redisStore({
          host: 'localhost',
          port: 6379,
          ttl: 10,
        }),
      }),
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
