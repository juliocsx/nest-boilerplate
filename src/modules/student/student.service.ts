import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Student } from './student.schema';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStudentDto } from './models/dtos/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student)
    private studentModel: typeof Student,
  ) {}
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    try {
      return this.studentModel.create(createStudentDto);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.findAll();
  }

  async findById(id: string): Promise<Student> {
    return this.studentModel.findOne({ where: { id: id } });
  }

  async update(id: string, data: Partial<Student>): Promise<Student> {
    const updatedStudent = await this.studentModel.update(data, {
      where: { id: id },
    });
    return updatedStudent[0][1];
  }
}
