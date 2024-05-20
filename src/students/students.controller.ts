import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { DatabaseService } from 'src/database.service';
import { StudentsService } from './students.service';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class StudentsController {

  constructor(private readonly studentService:StudentsService) {}

  @Get()
  async getAllUsers() {
    const users = await this.studentService.getAllUsers();
    return users;
  }

  
}
