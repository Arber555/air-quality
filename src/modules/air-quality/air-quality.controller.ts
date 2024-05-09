import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AirQualityService } from './air-quality.service';
import { AirQualityDTO } from './DTO/air-quality.dto';

@Controller('air-quality')
export class AirQualityController {
  constructor(private readonly airQualityService: AirQualityService) {}

  @Get()
  async getOne(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    airQualityDTO: AirQualityDTO,
  ) {
    try {
      const result = await this.airQualityService.getOne(airQualityDTO);
      return { Result: result };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }

  @Get('/paris-worst')
  async getParisWorst() {
    try {
      const result = await this.airQualityService.getParisWorst();
      return { Result: result };
    } catch (err) {
      return { success: false, message: err.message };
    }
  }
}
