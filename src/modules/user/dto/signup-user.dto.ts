import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SignupUserDtoType } from '../user.types';
import { SigninUserDto } from './signin-user.dto';

export class SignupUserDto extends SigninUserDto implements SignupUserDtoType {
  constructor(email: string, password: string, firstName: string, lastName) {
    super(email, password);
    this.firstName = firstName;
    this.lastName = lastName;
  }

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(64)
  lastName: string;
}
