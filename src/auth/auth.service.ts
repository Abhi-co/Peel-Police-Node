import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
      private readonly databaseService: DatabaseService) {}

    async login(username: string, password: string): Promise<string> {
        // Validate username and password (e.g., from a database)
        const isValidUser = await this.validateUser(username, password);

        console.log("isValidUser:",isValidUser);
    
        if (isValidUser) {
          // Generate JWT token
          const token = this.jwtService.sign({ username });
          return token;
        } else {
          // Throw an error if authentication fails
         // throw new Error('Invalid username or password');
         return 'Invalid username or password'
        }
      }
    
      private async validateUser(username: string, password: string): Promise<boolean> {
        // Fetch user credentials from the database
        const user = await this.databaseService.getUserByUsername(username);
        if(user){
          console.log("user:",user);
          return user && user.Password === password;

        }
        else{
          return false
        }

        // Check if user exists and password matches
        
      }
    
    
}
