import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':cartId')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body('cartId') cartId: number,
    @Req() req: Request & { user: { id: number } },
  ) {
    return await this.ordersService.createOrder(cartId, req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOrderById(@Param('id') orderId: number) {
    return await this.ordersService.findOrderById(orderId);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  async findAllOrdersByUserId(
    @Param('userId') userId: number,
    @Query() query: PaginationDto,
  ) {
    return await this.ordersService.findAllOrdersByUserId(userId, query);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteOrderById(@Param('id') orderId: number) {
    return await this.ordersService.deleteOrderById(orderId);
  }
}
