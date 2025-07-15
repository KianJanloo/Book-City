import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { PaginationDto } from 'src/common/pagination.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createContactDto: CreateContactDto,
    @Req() req: Request & { user: { id: number } },
  ) {
    return await this.contactService.create(createContactDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async findAll(@Query() query: PaginationDto) {
    return await this.contactService.findAll(query);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async findOne(@Req() req: Request & { params: { id: number } }) {
    return await this.contactService.findOne(req.params.id);
  }
}
