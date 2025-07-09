import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { LibpostalModule } from '../libpostal/libpostal.module';

@Module({
  imports: [LibpostalModule],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
