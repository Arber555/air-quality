import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection } from 'mongoose';
import * as request from 'supertest';
import { DatabaseService } from '../src/database/database.service';
import { AppModule } from '../src/app.module';

describe('Air-quality (e2e)', () => {
  let app: INestApplication;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let dbConnection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    dbConnection = moduleFixture
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    await dbConnection.db.dropDatabase();
  });

  it('should return when paris was most polluted', async () => {
    const now = new Date();
    const lat = 48.856613;
    const lon = 2.352222;
    await dbConnection.collection('AirQuality').insertMany([
      {
        lat,
        lon,
        timestamp: now,
        aqius: 12,
      },
      {
        lat,
        lon,
        timestamp: now,
        aqius: 50,
      },
      {
        lat,
        lon,
        timestamp: now,
        aqius: 35,
      },
    ]);

    request(app.getHttpServer())
      .get('/air-quality/paris-worst')
      .set('Accept', 'application/json')
      .expect((response) => {
        expect(response.body.Result.aqius).toEqual(50);
      })
      .expect(HttpStatus.OK);
  });

  it('should fail if no records on database', () => {
    request(app.getHttpServer())
      .get('/air-quality/paris-worst')
      .set('Accept', 'application/json')
      .expect(HttpStatus.NOT_FOUND);
  });

  it('should fail if no lat', () => {
    request(app.getHttpServer())
      .get('/air-quality?lon=1')
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should fail if no lon', () => {
    request(app.getHttpServer())
      .get('/air-quality?lat=1')
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should fail if lat and lon are not numbers', () => {
    request(app.getHttpServer())
      .get('/air-quality?lat=dsd&lon=sdfsd')
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST);
  });
});
