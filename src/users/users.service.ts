import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { ILike, Repository } from 'typeorm';
import { EditProfileDto } from './dto/editProfile.dto';
import { RegisterAuthDto } from 'src/auth/dto/registerAuth.dto';
import { OrderDto, PaginationDto, SearchDto } from 'src/common/pagination.dto';
import { orderValidator } from 'src/common/order.validator';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  getUsers = async (query: PaginationDto & SearchDto & OrderDto) => {
    const { page = 1, limit = 10, search, sort, order } = query;

    const where = search
      ? [
          {
            email: ILike(`%${search}%`),
            username: ILike(`%${search}%`),
          },
        ]
      : {};

    const allowedSortFields = ['created_at'];
    const orderBy = orderValidator({ sort, order, allowedSortFields });

    const [users, totalCount] = await this.userRepository.findAndCount({
      select: [
        'created_at',
        'email',
        'first_name',
        'id',
        'last_name',
        'profilePicture',
        'role',
        'updated_at',
        'username',
      ],
      skip: (page - 1) * limit,
      take: limit,
      where,
      order: orderBy,
    });

    return {
      users,
      totalCount,
    };
  };

  findAll = async (query: PaginationDto & SearchDto & OrderDto) => {
    return await this.getUsers(query);
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({
      where: { email },
    });
  };

  getUserById = async (id: number) => {
    return await this.userRepository.findOne({
      where: { id },
      select: [
        'created_at',
        'email',
        'first_name',
        'id',
        'last_name',
        'profilePicture',
        'role',
        'updated_at',
        'username',
      ],
    });
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

  changeRole = async (userId: number, newRole: string) => {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    await this.userRepository.update(userId, {
      role: newRole,
      updated_at: new Date(),
    });
    return {
      success: true,
      message: 'User role successfully updated',
    };
  };
}
