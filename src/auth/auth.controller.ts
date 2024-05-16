import { Controller, Post,Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body('username') username: string, @Body('password') password: string): Promise<{ token: string }> {
      const token = await this.authService.login(username, password);
      return { token };
    }

    @Get('get')
    async getauth(){
        return "test"
    }
}

