import { InjectModel } from "@nestjs/sequelize";
import { Student } from "../student/student.schema";
import { HttpException, HttpStatus } from "@nestjs/common";
import { LoginDto } from "./models/dtos/login.dto";
import { Auth } from "./auth.schema";
import { JwtService } from "@nestjs/jwt";

export class AuthService {
    constructor(
        @InjectModel(Student)
        private studentModel: typeof Student,

        @InjectModel(Auth)
        private authModel: typeof Auth,
        private jwtService: JwtService
      ) {}

    async login(loginDto: LoginDto): Promise<Auth> {
        const student = await this.studentModel.findOne({where: {email: loginDto.email}});

        if (!student) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        if (loginDto.password !== student.password) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }
        
        const payload = { student_id: student.id };
        const token = await this.jwtService.signAsync(payload, {
            secret: "fbv2024",
            expiresIn: '1h',
        });

        const session = await this.authModel.create({
            student_id: student.id,
            token: token,
        })

        return session
    }
}