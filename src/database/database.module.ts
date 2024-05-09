import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        const uri =
          configService.get<string>('NODE_ENV') === 'test'
            ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME_TEST}`
            : `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
