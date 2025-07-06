import { EditProfileDto } from './dto/editProfile.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async getAllUsers() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.usersService.findOne(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() editProfileDto: Partial<EditProfileDto>,
  ) {
    return await this.usersService.update(id, editProfileDto);
  }
}
