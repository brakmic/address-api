import { Module } from '@nestjs/common';
import { AddressModule } from './address/address.module';
import { LibpostalModule } from './libpostal/libpostal.module';

@Module({
  imports: [AddressModule, LibpostalModule],
})
export class AppModule {}
