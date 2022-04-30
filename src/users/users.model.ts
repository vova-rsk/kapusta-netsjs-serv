import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IUserCreationAttrs {
  email: string;
  password: string;
  name: string;
  avatar: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  avatar: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
    defaultValue: null,
  })
  token: string;
}
