import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttrs {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique user id from db' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'john.doe@mail.com', description: 'User email' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiPropertyOptional({
    example: '$2a$10$8zT6tHchmC23AlkJt6tdqeU6kKQQjkH3YOpi33Vj0TXi8qnPSwFCq',
    description: 'Crypted user password',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @ApiProperty({
    example: 'Johndoe',
    description: 'User nick-name (calculates from email)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({
    example: 'http://www.somehost.com/avatar/g1782dg1g728dg8d.jpg',
    description: 'User avatar (generates by defaults on user creation)',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar: string;

  @ApiPropertyOptional({
    example: 'ddqwdwd21dd12d12d.12d21d12d12d21d21d12d12d.d12d32d2323f2d',
    description: 'Authorization web token',
  })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  token: string;
}
