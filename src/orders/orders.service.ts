import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/common/pagination.dto';
import { Cart } from 'src/entities/cart.entity';
import { Order } from 'src/entities/orders.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private readonly usersService: UsersService,
  ) {}

  createOrder = async (cartId: number, userId: number) => {
    const user = await this.usersService.getUserById(userId);
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['books'],
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (!cart) {
      throw new HttpException('Cart not found', 404);
    }

    const order = this.ordersRepository.create({
      cartId: cart.id,
      userId,
      books: cart.books,
      user,
    });
    await this.ordersRepository.save(order);

    cart.books = [];
    await this.cartRepository.save(cart);

    return {
      success: true,
      message: 'Order created successfully',
    };
  };

  findOrderById = async (id: number) => {
    const order = await this.ordersRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new HttpException('Order not found', 404);
    }

    return {
      ...order,
      books: order.books,
    };
  };

  findAllOrdersByUserId = async (userId: number, query: PaginationDto) => {
    const { limit = 10, page = 1 } = query;
    const skip = (page - 1) * limit;

    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const [orders, totalCount] = await this.ordersRepository.findAndCount({
      where: { userId },
      select: ['id', 'cartId', 'userId', 'date'],
      skip,
      take: limit,
    });

    if (!orders || orders.length === 0) {
      throw new HttpException('No orders found for this user', 404);
    }

    return {
      orders,
      totalCount,
    };
  };

  deleteOrderById = async (id: number) => {
    const order = await this.ordersRepository.findOne({ where: { id } });

    if (!order) {
      throw new HttpException('Order not found', 404);
    }

    await this.ordersRepository.delete(id);

    return {
      success: true,
      message: 'Order deleted successfully',
    };
  };
}
