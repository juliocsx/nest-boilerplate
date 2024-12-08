import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './models/dtos/create-student.dto';
import { Student } from './student.schema';
import { UpdateStudentDto } from './models/dtos/update-student.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('student')
@UseGuards(AuthGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() body: CreateStudentDto): Promise<Student> {
    return this.studentService.create(body);
  }

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Student> {
    return this.studentService.findById(id);
  }

  @Patch(':id')
  update(
    @Param() id: string,
    @Body() body: UpdateStudentDto,
  ): Promise<Student> {
    return this.studentService.update(id, body);
  }
}
