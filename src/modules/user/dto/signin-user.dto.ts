import { IsEmail, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SigninUserDtoType } from '../user.types';

export class SigninUserDto implements SigninUserDtoType {
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,24}$/, {
    message: 'password must contain at least 8 characters, including UPPER/lowercase/digits and one special symbol',
  })
  password: string;
}
