import { Module } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityController } from './air-quality.controller';
import {
  AirQuality,
  AirQualitySchema,
} from '../../database/schemas/air-quality.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: AirQuality.name, schema: AirQualitySchema },
    ]),
    HttpModule,
  ],
  providers: [AirQualityService],
  controllers: [AirQualityController],
})
export class AirQualityModule {}
