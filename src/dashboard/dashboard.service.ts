import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from 'src/entities/favorites.entity';
import { Message } from 'src/entities/messages.entity';
import { Product } from 'src/entities/products.entity';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  getSummary = async () => {
    const totalUsers = await this.userRepository.count();
    const totalProducts = await this.productRepository.count();
    const totalFavorites = await this.favoriteRepository.count();
    const totalMessages = await this.messageRepository.count();

    return { totalUsers, totalProducts, totalFavorites, totalMessages };
  };
}
