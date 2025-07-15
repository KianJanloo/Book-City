import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from 'src/entities/cart.entity';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly productService: ProductsService,
    private readonly usersService: UsersService,
  ) {}

  async addToCart(productId: number, userId: number) {
    const user = await this.usersService.getUserById(userId);
    const product = await this.productService.getProductById(productId);

    if (!user || !product) {
      throw new HttpException('User or product not found', 404);
    }

    let cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['books'],
    });

    if (!cart) {
      cart = new Cart();
      cart.user = user;
      cart.books = [];
    }

    const alreadyInCart = cart.books.find((book) => book.id === product.id);
    if (!alreadyInCart) {
      cart.books.push(product);
    } else {
      throw new HttpException('This product is already in the cart', 400);
    }

    await this.cartRepository.save(cart);

    return {
      success: true,
      message: 'Book added to cart successfully',
    };
  }

  async getCartByUserId(userId: number) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const cart = await this.cartRepository.findOne({
      where: { user },
      relations: ['books'],
    });

    return {
      books: cart?.books || [],
      totalItems: cart?.books.length || 0,
      totalPrice:
        cart?.books.reduce((total, book) => total + Number(book.price), 0) || 0,
    };
  }

  async removeBookFromCart(productId: number, cartId: number) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['books'],
    });

    if (!cart) {
      throw new HttpException('Cart not found', 404);
    }

    if (!cart.books.some((book) => book.id === Number(productId))) {
      throw new HttpException('Book not found in cart', 404);
    }

    cart.books = cart.books.filter((book) => book.id !== Number(productId));
    await this.cartRepository.save(cart);

    return {
      success: true,
      message: 'Book removed from cart successfully',
    };
  }

  async clearCart(cartId: number) {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['books'],
    });

    if (!cart) {
      throw new HttpException('Cart not found', 404);
    }

    cart.books = [];
    await this.cartRepository.save(cart);

    return {
      success: true,
      message: 'Cart cleared successfully',
    };
  }
}
