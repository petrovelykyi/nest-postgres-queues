import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../entities/user.entity';
import { AddUserGuard } from '../../guards/add-user.guard';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { SigninUserDto } from './dto/signin-user.dto';
import { SignupUserDto } from './dto/signup-user.dto';
import { UserService } from './user.service';
import { Response } from 'express';

@ApiTags('user')
@Controller({ path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'SignUp' })
  @ApiResponse({ status: 201, description: 'SignUp User' })
  @ApiResponse({ status: 409, description: 'User already exists!' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async signup(@Body() signupUserDto: SignupUserDto): Promise<User> {
    return await this.userService.signup(signupUserDto);
  }

  @Post('/signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'SignIn' })
  @ApiResponse({ status: 200, description: 'SignIn User' })
  @ApiResponse({ status: 401, description: 'Wrong credentials!' })
  async signin(@Body() signinUserDto: SigninUserDto, @Res() res: Response): Promise<void> {
    const { status, cookie } = await this.userService.signin(signinUserDto);
    res.setHeader('Set-Cookie', cookie).status(status).end();
  }

  @Get('/check')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, AddUserGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Check User from JWT' })
  @ApiResponse({ status: 200, description: 'Found User from JWT', type: User })
  check(@Req() req, @Res() res: Response): void {
    res.send(req.user).end();
  }

  @Post('/signout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'SignOut' })
  @ApiResponse({ status: 200, description: 'SignOut' })
  @ApiResponse({ status: 401, description: 'Not authorized!' })
  signout(@Res() res: Response): void {
    const cookie = this.userService.getCookieForSignOut();
    res.setHeader('Set-Cookie', cookie).end();
  }
}
