import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add/:productId/:userId')
  @UseGuards(JwtAuthGuard)
  async addToCart(
    @Param('productId') productId: number,
    @Param('userId') userId: number,
  ) {
    return await this.cartService.addToCart(productId, userId);
  }

  @Get('/:userId')
  @UseGuards(JwtAuthGuard)
  async getCartByUserId(@Param('userId') userId: number) {
    return await this.cartService.getCartByUserId(userId);
  }

  @Delete('/remove/:productId/:cartId')
  @UseGuards(JwtAuthGuard)
  async removeBookFromCart(
    @Param('productId') productId: number,
    @Param('cartId') cartId: number,
  ) {
    return await this.cartService.removeBookFromCart(productId, cartId);
  }

  @Delete('/clear/:cartId')
  @UseGuards(JwtAuthGuard)
  async clearCart(@Param('cartId') cartId: number) {
    return await this.cartService.clearCart(cartId);
  }
}
