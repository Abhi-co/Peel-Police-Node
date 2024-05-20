import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { DatabaseService } from 'src/database.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({
      secret: "test", // Replace with your secret key
      signOptions: { expiresIn: '120s' }, // Set token expiration time
    }),
  ],
  providers: [AuthService,JwtStrategy,DatabaseService,ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
