import { Module } from '@nestjs/common';
import { LibpostalService } from './libpostal.service';

@Module({
  providers: [LibpostalService],
  exports: [LibpostalService],
})
export class LibpostalModule {}
