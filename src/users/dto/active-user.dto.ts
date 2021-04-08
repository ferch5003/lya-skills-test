import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class ActivateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'username',
    'password',
    'firstname',
    'lastname',
    'age',
  ] as const)
) {}
