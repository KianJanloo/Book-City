import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorites.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoriteService) {}

  @Get()
  async findAll(@Req() req: Request & { user: { id: number } }) {
    const userId = req.user.id;
    return await this.favoritesService.findAll(userId);
  }

  @Get(':id')
  async findOne(
    @Req() req: Request & { user: { id: number } },
    @Param('id') productId: number,
  ) {
    const userId = req.user.id;
    return await this.favoritesService.findOne(userId, productId);
  }

  @Post(':id')
  async create(
    @Req() req: Request & { user: { id: number } },
    @Param('productId') productId: number,
  ) {
    const userId = req.user.id;
    return await this.favoritesService.addFavorite(userId, productId);
  }

  @Delete(':id')
  async delete(
    @Req() req: Request & { user: { id: number } },
    @Param('id') favoriteId: number,
  ) {
    const userId = req.user.id;
    return await this.favoritesService.deleteFavorite(userId, favoriteId);
  }
}
