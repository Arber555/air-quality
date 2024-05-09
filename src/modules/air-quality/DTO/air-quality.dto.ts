import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AirQualityDTO {
  @ApiProperty({ description: 'Latitude', type: Number })
  @IsNumber()
  @IsNotEmpty()
  lat: number;

  @ApiProperty({ description: 'Longitude', type: Number })
  @IsNumber()
  @IsNotEmpty()
  lon: number;
}
