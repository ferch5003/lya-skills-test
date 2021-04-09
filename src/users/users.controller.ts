import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserExistGuard } from 'src/guards/user-exist.guard';
import { UserActiveGuard } from 'src/guards/user-active.guard';
import { TokenBlacklistExistGuard } from 'src/guards/token-blacklist-exist.guard';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UserExistGuard)
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.usersService.create(createUserDto).then((res) => {
      response.status(HttpStatus.OK).json({ id: res.seqID });
    });
  }

  @UseGuards(UserActiveGuard, JwtAuthGuard, TokenBlacklistExistGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.usersService.findOne(+id).then((res) => {
      const { seqID, firstname, lastname, username, age, active } = res;
      response
        .status(HttpStatus.OK)
        .json({ id: seqID, firstname, lastname, username, age, active });
    });
  }

  @UseGuards(JwtAuthGuard, TokenBlacklistExistGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.usersService.update(+id, updateUserDto).then(() => {
      response
        .status(HttpStatus.OK)
        .json({ message: 'Information updated successfully' });
    });
  }

  @UseGuards(JwtAuthGuard, TokenBlacklistExistGuard)
  @Patch(':id/active')
  activate(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.usersService.activate(+id).then(() => {
      response
        .status(HttpStatus.OK)
        .json({ message: 'User activated successfully' });
    });
  }

  @UseGuards(JwtAuthGuard, TokenBlacklistExistGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.usersService.remove(+id).then(() => {
      response
        .status(HttpStatus.OK)
        .json({ message: 'User deleted successfully' });
    });
  }
}
