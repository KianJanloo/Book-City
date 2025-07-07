import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Favorite } from 'src/entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Favorite])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
