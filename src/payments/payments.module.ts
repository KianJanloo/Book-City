import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/entities/payments.entity';
import { UsersModule } from 'src/users/users.module';
import { Order } from 'src/entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order]), UsersModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
