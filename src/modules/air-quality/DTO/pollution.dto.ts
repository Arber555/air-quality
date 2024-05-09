import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber } from 'class-validator';

export class PollutionDTO {
  @ApiProperty({ description: 'ts', type: Date })
  @IsDate()
  ts: Date;

  @ApiProperty({ description: 'aqius', type: Number })
  @IsNumber()
  aqius: number;

  @ApiProperty({ description: 'mainus', type: String })
  @IsNumber()
  mainus: string;

  @ApiProperty({ description: 'aqicn', type: Number })
  @IsNumber()
  aqicn: number;

  @ApiProperty({ description: 'maincn', type: String })
  @IsNumber()
  maincn: string;
}
