import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AirQualityDocument = HydratedDocument<AirQuality>;

@Schema()
export class AirQuality {
  @Prop({ type: Number, required: true })
  lat: number;

  @Prop({ type: Number, required: true })
  lon: number;

  @Prop({ type: Date, default: Date.now })
  timestamp: Date;

  @Prop({ type: Number, required: true })
  aqius: number;
}

export const AirQualitySchema = SchemaFactory.createForClass(AirQuality);
