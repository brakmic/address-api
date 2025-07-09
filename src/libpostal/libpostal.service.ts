import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as postal from 'node-postal';

@Injectable()
export class LibpostalService {
  parseAddress(address: string): { label: string; value: string }[] {
    if (!address) throw new InternalServerErrorException('No address provided');
    try {
      const parsed = postal.parser.parse_address(address);
      return parsed.map(({ component, value }) => ({
        label: component,
        value,
      }));
    } catch (e: any) {
      throw new InternalServerErrorException('Libpostal parse error: ' + e.message);
    }
  }

  normalizeAddress(address: string): string {
    if (!address) throw new InternalServerErrorException('No address provided');
    try {
      const normalized = postal.expand.expand_address(address);
      return normalized[0] || address;
    } catch (e: any) {
      throw new InternalServerErrorException('Libpostal normalize error: ' + e.message);
    }
  }
}
