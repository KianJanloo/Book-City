import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentsService.createPayment(createPaymentDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getPaymentById(@Param('id') id: number) {
    return await this.paymentsService.getPaymentById(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async getAllPayments() {
    return await this.paymentsService.getAllPayments();
  }

  @Get('user/:userId')
  @UseGuards(JwtAuthGuard)
  async getPaymentsByUserId(@Param('userId') userId: number) {
    return await this.paymentsService.getPaymentsByUserId(userId);
  }

  @Put(':id/accept')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async acceptPayment(@Param('id') id: number) {
    return await this.paymentsService.acceptPayment(id);
  }

  @Put(':id/reject')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async rejectPayment(@Param('id') id: number) {
    return await this.paymentsService.rejectPayment(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePayment(
    @Param('id') id: number,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return await this.paymentsService.editPayment(id, updatePaymentDto);
  }
}
