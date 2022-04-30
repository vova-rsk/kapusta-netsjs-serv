import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: UserDto) {
    const { email, password } = userDto;

    const isExist = await this.userRepository.findOne({
      where: { email },
    });

    if (isExist) {
      throw new HttpException('Already Exist', HttpStatus.CONFLICT);
    }

    const nameTmp = email.split('@')[0];
    const name = nameTmp[0].toUpperCase() + nameTmp.slice(1);
    const avatar = gravatar.url(email, {
      protocol: 'http',
      s: '250',
      d: 'robohash',
    });

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const result = await this.userRepository.create({
      email,
      password: hashedPassword,
      name,
      avatar,
    });

    const user = {
      id: result.id,
      name: result.name,
      email: result.email,
      avatar: result.avatar,
    };

    return user;
  }

  async getById(id: number) {
    const result = await this.userRepository.findByPk(id, {
      attributes: ['id', 'name', 'email', 'avatar'],
    });

    return result;
  }

  async getByEmail(email: string) {
    const result = await this.userRepository.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password', 'avatar', 'createdAt'],
    });

    return result;
  }
}
