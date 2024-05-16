import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {}

    async login(username: string, password: string): Promise<string> {
        // Validate username and password (e.g., from a database)
        const isValidUser = await this.validateUser(username, password);
    
        if (isValidUser) {
          // Generate JWT token
          const token = this.jwtService.sign({ username });
          return token;
        } else {
          // Throw an error if authentication fails
          throw new Error('Invalid username or password');
        }
      }
    
      private async validateUser(username: string, password: string): Promise<boolean> {
        // Example: Validate user from a database
        // You can replace this with your own logic
        return (username === 'Abhishek' && password === 'Vos@123');
      }
    
    
}
