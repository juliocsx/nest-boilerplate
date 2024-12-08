import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./models/dtos/login.dto";
import { Auth } from "./auth.schema";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    login(@Body() body: LoginDto): Promise<Auth> {
      return this.authService.login(body);
    }
}