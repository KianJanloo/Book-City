import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/strategies/auth.strategy';
import { EmailService } from 'src/email/email.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Code } from 'src/entities/codes.entity';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: 'SECRETIANOINOSECURE' }),
    TypeOrmModule.forFeature([Code]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, EmailService],
})
export class AuthModule {}
