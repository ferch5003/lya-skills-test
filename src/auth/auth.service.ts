import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const matchPass = user ? user.validatePassword(password) : null;
    if (user && matchPass) {
      const payload = {
        username: user.username,
        sub: user.seqID,
      };
      const authetincatedser = {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        token: this.jwtService.sign(payload),
      };
      return authetincatedser;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.seqID,
    };
    return {
      jwt: this.jwtService.sign(payload),
    };
  }
}
