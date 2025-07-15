import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Favorite } from 'src/entities/favorites.entity';
import { Message } from 'src/entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, User, Favorite, Message])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
