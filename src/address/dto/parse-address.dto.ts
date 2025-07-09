import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ParseAddressDto {
  @ApiProperty({ example: '123 Main St, Springfield' })
  @IsString()
  address!: string;
}