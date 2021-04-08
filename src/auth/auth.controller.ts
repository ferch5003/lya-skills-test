import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('authorization')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  create(@Body() loginUserDto: LoginUserDto, @Res({ passthrough: true }) response: Response) {
    const validatedUser = this.authService.validateUser(
      loginUserDto.username,
      loginUserDto.password
    );
    if (validatedUser) {
      return validatedUser;
    }
    return response
      .status(HttpStatus.UNAUTHORIZED)
      .json({ message: 'Invalid credentials, try again' });
  }

  @Delete()
  remove() {
    // return this.usersService.remove(+id);
  }
}
