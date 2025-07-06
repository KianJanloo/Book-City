import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/favorites.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  getFavoritesByUser = async (userId: number) => {
    const favorites = await this.favoriteRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['product'],
    });
    return favorites;
  };

  findAll = async (userId: number) => {
    return await this.getFavoritesByUser(userId);
  };

  findOne = async (userId: number, favoriteId: number) => {
    console.log(favoriteId);
    const favoriteFounded = await this.favoriteRepository.findOne({
      where: { id: favoriteId },
    });

    if (!favoriteFounded) {
      throw new HttpException('Favorite not found', 404);
    }

    const favorite = await this.favoriteRepository.findOne({
      where: {
        user: { id: userId },
        id: favoriteId,
      },
      relations: ['product'],
    });
    if (!favorite) {
      throw new HttpException('Favorite not found', 404);
    }
    return favorite;
  };

  addFavorite = async (userId: number, productId: number) => {
    const user = await this.favoriteRepository.manager.findOne('User', {
      where: { id: userId },
    });

    const product = await this.favoriteRepository.manager.findOne('Product', {
      where: { id: productId },
    });

    if (!user || !product) {
      throw new HttpException('User or product not found', 404);
    }

    const favoriteExists = await this.favoriteRepository.findOne({
      where: { user, product },
    });

    if (favoriteExists) {
      throw new HttpException('Favorite already exists', 400);
    }

    const favorite = this.favoriteRepository.create({
      user,
      product,
      createdAt: new Date(),
    });

    await this.favoriteRepository.save(favorite);

    return {
      success: true,
      message: 'Favorite added successfully',
    };
  };

  deleteFavorite = async (userId: number, favoriteId: number) => {
    const favorite = await this.favoriteRepository.findOne({
      where: { id: favoriteId },
    });

    if (!favorite) {
      throw new HttpException('Favorite not found', 404);
    }

    await this.favoriteRepository.delete({ id: favoriteId });

    return {
      success: true,
      message: 'Favorite deleted successfully',
    };
  };
}
