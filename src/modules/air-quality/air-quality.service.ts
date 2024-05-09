import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { AirQuality } from 'src/database/schemas/air-quality.schema';
import { AirQuality } from '../../database/schemas/air-quality.schema';
import { AirQualityDTO } from './DTO/air-quality.dto';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { PollutionDTO } from './DTO/pollution.dto';

@Injectable()
export class AirQualityService {
  constructor(
    @InjectModel(AirQuality.name) private airQualityModel: Model<AirQuality>,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getOne(airQualityDTO: AirQualityDTO): Promise<PollutionDTO> {
    const { lat, lon } = airQualityDTO;
    const apiKey = this.configService.get<string>('apiKey');
    try {
      const response = await this.httpService
        .get(
          `https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${apiKey}`,
        )
        .toPromise();

      if (response.data.status !== 'success') {
        throw new ConflictException(
          'Error fetching air quality data. ',
          response.data.message,
        );
      }

      return response.data.data.current.pollution;
    } catch (error) {
      throw new ConflictException('Error fetching air quality data');
    }
  }

  async getParisWorst() {
    const lat = 48.856613;
    const lon = 2.352222;

    try {
      const airQuality = await this.airQualityModel
        .findOne({ lat, lon }, 'lat lon aqius timestamp -_id')
        .sort({ aqius: -1 })
        .lean()
        .exec();

      if (!airQuality) {
        throw new NotFoundException('No air quality for paris!');
      }

      return airQuality;
    } catch (error) {
      throw new InternalServerErrorException('Internal server error: ', error);
    }
  }

  @Cron('0 */1 * * * *')
  async cron(): Promise<void> {
    const lat = 48.856613;
    const lon = 2.352222;
    console.log('cron');
    try {
      const response = await this.getOne({ lat, lon } as AirQualityDTO);

      const airQuality = new this.airQualityModel({
        lat,
        lon,
        aqius: response.aqius,
      });
      await airQuality.save();
    } catch (error) {
      throw new InternalServerErrorException('Internal server error: ', error);
    }
  }
}
