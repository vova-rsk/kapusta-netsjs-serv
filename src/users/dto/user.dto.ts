import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    example: 'john.doe@mail.com',
    description: 'User email',
  })
  readonly email: string;

  @ApiProperty({
    example: 'Password123',
    description: 'User password',
  })
  readonly password: string;
}
