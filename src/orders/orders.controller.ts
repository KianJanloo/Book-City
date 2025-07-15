import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(':cartId')
  @UseGuards(JwtAuthGuard)
  createOrder(
    @Body('cartId') cartId: number,
    @Req() req: Request & { user: { id: number } },
  ) {
    return this.ordersService.createOrder(cartId, req.user.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOrderById(@Param('id') orderId: number) {
    return this.ordersService.findOrderById(orderId);
  }

  @Get('/user/:userId')
  @UseGuards(JwtAuthGuard)
  findAllOrdersByUserId(@Param('userId') userId: number) {
    return this.ordersService.findAllOrdersByUserId(userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteOrderById(@Param('id') orderId: number) {
    return this.ordersService.deleteOrderById(orderId);
  }
}
