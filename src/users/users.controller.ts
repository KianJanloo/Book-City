import { JwtAuthGuard } from 'src/auth/auth.guard';
import { ChangeRoleDto } from './dto/changeRole.dto';
import { EditProfileDto } from './dto/editProfile.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/role.decorator';
import { OrderDto, PaginationDto, SearchDto } from 'src/common/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers(@Query() query: PaginationDto & SearchDto & OrderDto) {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('id') id: number,
    @Body() editProfileDto: Partial<EditProfileDto>,
  ) {
    return await this.usersService.update(id, editProfileDto);
  }

  @Put('change-role/:id')
  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  async changeRole(
    @Param('id') id: number,
    @Body() changeRoleDto: ChangeRoleDto,
  ) {
    return await this.usersService.changeRole(id, changeRoleDto.role);
  }
}
