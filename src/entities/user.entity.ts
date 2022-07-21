import { ApiProperty } from '@nestjs/swagger';
import { BeforeInsert, Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { SignupUserDto } from '../modules/user/dto/signup-user.dto';
import { UserEntityType } from '../modules/user/user.types';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class User extends SignupUserDto implements UserEntityType {
  constructor(email: string, password: string, firstName: string, lastName: string) {
    super(email, password, firstName, lastName);
  }

  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: '03691f9d-665c-4c76-bcf3-89270d99851d', description: 'uuid()' })
  id: string;

  @Column()
  @ApiProperty({
    example: 'John',
    description: 'First Name',
  })
  firstName: string;

  @Column()
  @ApiProperty({
    example: 'Doe',
    description: 'Last Name',
  })
  lastName: string;

  @Column()
  @Index({ unique: true })
  @ApiProperty({
    example: 'user@example.com',
    description: 'User`s Email',
  })
  email: string;

  @Exclude()
  @Column()
  @ApiProperty({
    example: 'Qwerty123!',
    description: 'User`s Password',
  })
  password: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await this.getHashPassword();
  }

  async getHashPassword(): Promise<string> {
    return await bcrypt.hash(this.password, 10);
  }

  async verifyPassword(value: string): Promise<boolean> {
    return await bcrypt.compare(value, this.password);
  }
}
