import { HttpException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/entities/messages.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/pagination.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}
  sendContactMessage(contactDetails: CreateContactDto & { userId: number }) {
    const message = this.messageRepository.create(contactDetails);
    return this.messageRepository.save(message);
  }

  async create(createContactDto: CreateContactDto, userId: number) {
    const message = await this.sendContactMessage({
      ...createContactDto,
      userId: userId,
    });

    if (!message) {
      throw new HttpException('Failed to send contact message', 400);
    }

    return {
      success: true,
      message: 'Contact message sent successfully',
    };
  }

  async findAll(query: PaginationDto) {
    const { limit = 10, page = 1 } = query;

    const [messages, totalCount] = await this.messageRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    return {
      messages,
      totalCount,
    };
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOneBy({ id });
    if (!message) {
      throw new HttpException('Message not found', 404);
    }
    return message;
  }
}
