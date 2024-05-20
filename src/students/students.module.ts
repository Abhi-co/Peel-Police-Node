import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { DatabaseService } from 'src/database.service';

@Module({
  providers: [StudentsService,DatabaseService],
  controllers: [StudentsController]
})
export class StudentsModule {}
