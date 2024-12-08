import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Auth } from "./auth.schema";
import { Student } from "../student/student.schema";
import { JwtService } from "@nestjs/jwt";
import { AuthGuard } from "./auth.guard";

@Module({
    imports: [SequelizeModule.forFeature([Auth, Student])],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtService,
        AuthGuard
    ],
    exports: [AuthGuard, JwtService]
})
export class AuthModule {}