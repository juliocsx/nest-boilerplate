import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './student.schema';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { Auth } from '../auth/auth.schema';

@Module({
  imports: [SequelizeModule.forFeature([Student, Auth])],
  controllers: [StudentController],
  providers: [StudentService, AuthGuard, JwtService],
})
export class StudentModule {}
