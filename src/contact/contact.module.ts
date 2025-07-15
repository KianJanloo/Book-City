import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
