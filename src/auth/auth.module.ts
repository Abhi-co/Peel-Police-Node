import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { JwtStrategy } from './jwt.strategy';
import { jwtConstants } from './constants';
import { DatabaseService } from 'src/database.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_TOKEN_SECRET'),
        signOptions: { expiresIn: '120s' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService,JwtStrategy,DatabaseService,ConfigService],
  controllers: [AuthController]
})
export class AuthModule {}
