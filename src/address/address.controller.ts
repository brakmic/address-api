import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AddressService } from './address.service';
import { ParseAddressDto } from './dto/parse-address.dto';
import { NormalizeAddressDto } from './dto/normalize-address.dto';
import {
  AddressParseResponse,
  AddressNormalizeResponse,
  AddressErrorResponse,
} from './types/address-response.type';
import { ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('parse')
  @ApiBody({ type: ParseAddressDto })
  @ApiResponse({ status: 201, type: AddressParseResponse })
  @ApiResponse({ status: 400, type: AddressErrorResponse })
  parse(@Body() parseAddressDto: ParseAddressDto): AddressParseResponse | AddressErrorResponse {
    try {
      return this.addressService.parse(parseAddressDto.address);
    } catch (e: any) {
      throw new HttpException({ error: e.message }, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('normalize')
  @ApiBody({ type: NormalizeAddressDto })
  @ApiResponse({ status: 201, type: AddressNormalizeResponse })
  @ApiResponse({ status: 400, type: AddressErrorResponse })
  normalize(@Body() normalizeAddressDto: NormalizeAddressDto): AddressNormalizeResponse | AddressErrorResponse {
    try {
      return this.addressService.normalize(normalizeAddressDto.address);
    } catch (e: any) {
      throw new HttpException({ error: e.message }, HttpStatus.BAD_REQUEST);
    }
  }
}
