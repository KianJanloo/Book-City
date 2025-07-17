import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payments.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UsersService } from 'src/users/users.service';
import { Order } from 'src/entities/orders.entity';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentsRepository: Repository<Payment>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    private readonly usersService: UsersService,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto) {
    const user = await this.usersService.getUserById(createPaymentDto.userId);
    const order = await this.ordersRepository.findOne({
      where: { id: createPaymentDto.orderId },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (!order) {
      throw new HttpException('Order not found', 404);
    }

    const payment = this.paymentsRepository.create(createPaymentDto);
    await this.paymentsRepository.save(payment);

    return {
      success: true,
      message: 'Payment created successfully',
    };
  }

  async getPaymentById(id: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
    });

    if (!payment) {
      throw new HttpException('Payment not found', 404);
    }

    return payment;
  }

  async getAllPayments() {
    return await this.paymentsRepository.find();
  }

  async getPaymentsByUserId(userId: number) {
    const payments = await this.paymentsRepository.find({
      where: { userId },
    });

    if (payments.length === 0) {
      throw new HttpException('No payments found for this user', 404);
    }

    return payments;
  }

  async rejectPayment(paymentId: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new HttpException('Payment not found', 404);
    }

    payment.status = 'cancelled';
    payment.updatedAt = new Date();

    await this.paymentsRepository.save(payment);

    return {
      success: true,
      message: 'Payment rejected successfully',
    };
  }

  async acceptPayment(paymentId: number) {
    const payment = await this.paymentsRepository.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new HttpException('Payment not found', 404);
    }

    payment.status = 'completed';
    payment.updatedAt = new Date();

    await this.paymentsRepository.save(payment);

    return {
      success: true,
      message: 'Payment accepted successfully',
    };
  }

  async editPayment(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentsRepository.findOne({
      where: { id },
    });

    if (!payment) {
      throw new HttpException('Payment not found', 404);
    }

    Object.assign(payment, updatePaymentDto);
    payment.updatedAt = new Date();

    await this.paymentsRepository.save(payment);

    return {
      success: true,
      message: 'Payment updated successfully',
    };
  }
}
