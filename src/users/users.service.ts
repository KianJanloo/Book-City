import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { EditProfileDto } from './dto/editProfile.dto';
import { RegisterAuthDto } from 'src/auth/dto/registerAuth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers = async () => {
    const users = await this.userRepository.find();
    return users;
  };

  findAll = async () => {
    return await this.getUsers();
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({
      where: { email },
    });
  };

  getUserById = async (id: number) => {
    return await this.userRepository.findOne({ where: { id } });
  };

  findOne = async (id: number) => {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return user;
  };

  editProfile = async (id: number, editProfileDto: Partial<EditProfileDto>) => {
    return await this.userRepository.update(id, {
      ...editProfileDto,
      updated_at: new Date(),
    });
  };

  changePassword = async (id: number, newPassword: string) => {
    return await this.userRepository.update(id, {
      password: newPassword,
      updated_at: new Date(),
    });
  };

  update = async (id: number, editProfileDto: Partial<EditProfileDto>) => {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    await this.editProfile(id, editProfileDto);

    return {
      success: true,
      message: 'User successfully updated',
    };
  };

  createUser = async (registerAuthDto: RegisterAuthDto) => {
    const newUser = this.userRepository.create(registerAuthDto);
    return await this.userRepository.save(newUser);
  };
}
