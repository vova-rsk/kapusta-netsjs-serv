import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from './dto/user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async createUser(userDto: UserDto) {
    const { email, password } = userDto;
    const name = email.split('@')[0];
    const avatar = 'template';

    const result = await this.userRepository.create({
      email,
      password,
      name,
      avatar,
    });

    const user = {
      name: result.name,
      email: result.email,
      avatar: result.avatar,
    };

    return user;
  }

  async getUser(id: number) {
    const result = await this.userRepository.findByPk(id, {
      attributes: ['name', 'email', 'avatar'],
    });

    return result;
  }
}
