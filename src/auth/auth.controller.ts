import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Body() loginUserDto: LoginUserDto) {
        return this.authService.login(req.user);
    }
}
