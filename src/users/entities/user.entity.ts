import { Exclude } from 'class-transformer';

export class UserEntity {
  @Exclude()
  firstname: string;

  @Exclude()
  lastname: string;

  @Exclude()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  age: number;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
