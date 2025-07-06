import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/favorites.entity';
import { FavoritesController } from './favorites.controller';
import { FavoriteService } from './favorites.service';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  controllers: [FavoritesController],
  providers: [FavoriteService],
})
export class FavoritesModule {}
