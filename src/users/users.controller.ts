import {
  HttpException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'user creation' })
  @ApiResponse({ status: 201, type: User })
  @Post()
  async signup(@Body() userDto: UserDto) {
    const user = await this.usersService.createUser(userDto);

    return {
      code: 201,
      status: 'success',
      data: user,
    };
  }

  @ApiOperation({ summary: 'user getting by id' })
  @ApiResponse({ status: 200, type: User })
  @Get(':id')
  async current(@Param('id') id: number) {
    const user = await this.usersService.getById(id);

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
