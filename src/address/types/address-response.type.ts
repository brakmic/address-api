import { ApiProperty } from '@nestjs/swagger';

export class AddressParseComponent {
  @ApiProperty({ example: 'road' })
  label!: string;

  @ApiProperty({ example: 'Main St' })
  value!: string;
}

export class AddressParseResponse {
  @ApiProperty({ type: [AddressParseComponent] })
  components!: AddressParseComponent[];
}

export class AddressNormalizeResponse {
  @ApiProperty({ example: '123 main st springfield' })
  normalized!: string;
}

export class AddressErrorResponse {
  @ApiProperty({ example: 'Invalid address' })
  error!: string;
}

export type AddressResponse =
  | AddressParseResponse
  | AddressNormalizeResponse
  | AddressErrorResponse;
