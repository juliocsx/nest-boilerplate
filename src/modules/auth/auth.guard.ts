import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Student } from '../student/student.schema';
import { InjectModel } from '@nestjs/sequelize';
import { UUID } from 'sequelize';
import { Auth } from './auth.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectModel(Student)
    private studentModel: typeof Student,
    @InjectModel(Auth)
    private authModel: typeof Auth,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.bearer) {
      return false;
    }

    const token = request.headers.bearer.split(' ')[0];

    if (token === '') {
      return false;
    }

    const payload = this.jwtService.decode(token);

    const session = await this.authModel.findOne({
      where: { token: token },
    });

    if (!session) {
      return false;
    }

    if (session.active === false) {
      return false;
    }

    const now = Date.now();
    const elapsedTime = now - session.createdAt;
    const tokenExpirationTime = 1000 * 60 * 60;

    if (elapsedTime > tokenExpirationTime) {
      await this.authModel.update(
        { active: false },
        { where: { id: session.id } },
      );
      return false;
    }
    const student = await this.studentModel.findOne({
      where: { id: payload.student_id },
    });

    if (!student) {
      return false;
    }

    return true;
  }
}
