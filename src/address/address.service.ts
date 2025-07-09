import { Injectable } from '@nestjs/common';
import { LibpostalService } from '../libpostal/libpostal.service';
import { AddressParseResponse, AddressNormalizeResponse } from './types/address-response.type';

@Injectable()
export class AddressService {
  constructor(private readonly libpostal: LibpostalService) {}

  parse(address: string): AddressParseResponse {
    const components = this.libpostal.parseAddress(address);
    return { components };
  }

  normalize(address: string): AddressNormalizeResponse {
    const normalized = this.libpostal.normalizeAddress(address);
    return { normalized };
  }
}
