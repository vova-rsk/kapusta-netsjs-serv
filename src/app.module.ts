import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

const {
  POSTGRESS_DB,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRESS_USER,
  POSTGRESS_PASSWORD,
} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      username: POSTGRESS_USER,
      password: POSTGRESS_PASSWORD,
      database: POSTGRESS_DB,
      models: [],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
