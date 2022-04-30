import {
  HttpException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userDto: UserDto) {
    let user = null;

    try {
      user = await this.usersService.createUser(userDto);
    } catch (error) {
      console.log(error.original);
      throw new HttpException('Already Exist', HttpStatus.CONFLICT);
    }

    return {
      code: 201,
      status: 'success',
      data: user,
    };
  }

  @Get(':id')
  async current(@Param('id') id: number) {
    const user = await this.usersService.getUser(id);

    if (!user) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }

    return {
      code: 200,
      status: 'success',
      data: user,
    };
  }
}
