import { LoginAuthDto } from './dto/loginAuth.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterAuthDto } from './dto/registerAuth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Code } from 'src/entities/codes.entity';
import { ResetPasswordAuthDto } from './dto/resetPasswordAuth.dto';

interface JwtPayload {
  id: number;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @InjectRepository(Code)
    private readonly codeRepository: Repository<Code>,
  ) {}

  login = async (loginAuthDto: LoginAuthDto) => {
    const user = await this.usersService.getUserByEmail(loginAuthDto.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const hashedPassword = await bcrypt.compare(
      loginAuthDto.password,
      user.password,
    );

    if (!hashedPassword) {
      throw new HttpException('Invalid password', 401);
    }

    const accessToken = this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = this.jwtService.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      { expiresIn: '7d' },
    );

    return {
      accessToken,
      refreshToken,
    };
  };

  refreshToken = async (refreshToken: string) => {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken);

      const user = await this.usersService.getUserById(payload.id);
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const accessToken = this.jwtService.sign(
        {
          id: user.id,
          role: user.role,
          email: user.email,
        },
        { expiresIn: '1h' },
      );

      return { accessToken };
    } catch {
      throw new HttpException('Invalid token', 401);
    }
  };

  register = async (registerAuthDto: RegisterAuthDto) => {
    const existUser = await this.usersService.getUserByEmail(
      registerAuthDto.email,
    );

    if (existUser) {
      throw new HttpException('Email already exists', 409);
    }

    registerAuthDto.password = await bcrypt.hash(registerAuthDto.password, 10);

    await this.usersService.createUser(registerAuthDto);

    return {
      success: true,
      message: 'Registered successfully completed.',
    };
  };

  forgetPassword = async (email: string) => {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const uniqueCode = await this.generateUniqueCode();

    const codeData = {
      email,
      code: uniqueCode,
    };

    const newCode = this.codeRepository.create(codeData);
    await this.codeRepository.save(newCode);

    await this.emailService.sendForgotPasswordEmail(email, codeData.code);

    return {
      success: true,
      message: 'Reset password email sent successfully.',
    };
  };

  resetPassword = async (resetPasswordAuthDto: ResetPasswordAuthDto) => {
    console.log(resetPasswordAuthDto);
    const savedCode = await this.codeRepository.findOneBy({
      email: resetPasswordAuthDto.email,
      code: resetPasswordAuthDto.code,
    });

    if (!savedCode || savedCode.isValid) {
      throw new HttpException('Invalid or expired code', 400);
    }

    const user = await this.usersService.getUserByEmail(
      resetPasswordAuthDto.email,
    );

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const hashedPassword = await bcrypt.hash(
      resetPasswordAuthDto.newPassword,
      10,
    );

    console.log(user);
    console.log(savedCode.id, hashedPassword);

    await this.usersService.changePassword(user.id, hashedPassword);

    await this.codeRepository.update(savedCode.id, { isValid: true });

    return {
      success: true,
      message: 'Password reset successfully',
    };
  };

  async generateUniqueCode(): Promise<string> {
    const start = 10000;
    const end = 99999;

    let code: string;
    let exists: boolean;

    do {
      code = Math.floor(Math.random() * (end - start + 1) + start).toString();
      exists = (await this.codeRepository.findOneBy({ code })) !== null;
    } while (exists);

    return code;
  }
}
