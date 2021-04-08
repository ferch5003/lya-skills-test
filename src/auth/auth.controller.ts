import {
  Headers,
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { TokenBlacklistService } from 'src/token-blacklist/token-blacklist.service';
import { TokenBlacklistExistGuard } from 'src/guards/token-blacklist-exist.guard';

@Controller('authorization')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenBlacklistService: TokenBlacklistService
  ) {}

  @Post()
  create(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    try {
      const validatedUser = this.authService.validateUser(
        loginUserDto.username,
        loginUserDto.password
      );
      return validatedUser.then((res) => {
        if (res) {
          return res;
        }
        response
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: 'Invalid credentials, try again' });
      });
    } catch (error) {
      return response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error });
    }
  }

  @UseGuards(TokenBlacklistExistGuard)
  @Delete()
  remove(
    @Headers('authorization') authorization,
    @Res({ passthrough: true }) response: Response
  ) {
    const token = authorization.replace('Bearer ', '');
    return this.tokenBlacklistService
      .create(token)
      .then((res) => {
        response.status(HttpStatus.OK).json({ message: 'Logout successfully' });
      })
      .catch((error) => {
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error });
      });
  }
}
