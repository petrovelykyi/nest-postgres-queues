import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { REPOS } from '../database/database.constants';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(REPOS.user_repository)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findById(id: string): Promise<User> | null {
    return await this.usersRepository.findOne({
      where: { id },
      select: { id: true, email: true, firstName: true, lastName: true, password: false },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async validateUser(user: SigninUserDto): Promise<{ id: string; email: string; password: string } | null> {
    const foundUser = await this.findByEmail(user.email);
    if (foundUser && (await foundUser.verifyPassword(user.password))) {
      const { ...result } = foundUser;

      return result;
    }

    return null;
  }

  public getCookieWithJwtToken(payload: { id: string }): string {
    const token = this.jwtService.sign(payload);

    return `Authentication=Bearer ${token}; HttpOnly; Path=/; Max-Age=${
      60 * 60 * 24 * parseInt(process.env.COOKIE_MAX_AGE)
    }`;
  }

  public getCookieForSignOut(): string {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async signup(user: SignupUserDto): Promise<User> {
    if (await this.findByEmail(user.email)) {
      throw new HttpException('User already exists!', HttpStatus.CONFLICT);
    }
    const newUser = new User(user.email, user.password, user.firstName, user.lastName);

    return await this.usersRepository.save(newUser);
  }

  async signin(user: SigninUserDto): Promise<{ status: HttpStatus.OK | HttpStatus.UNAUTHORIZED; cookie: string }> {
    const validUser = await this.validateUser(user);
    if (!validUser) {
      return { status: HttpStatus.UNAUTHORIZED, cookie: this.getCookieForSignOut() };
    }

    return { status: HttpStatus.OK, cookie: this.getCookieWithJwtToken({ id: validUser.id }) };
  }
}
