import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AddressController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/address/parse (POST)', () => {
    return request(app.getHttpServer())
      .post('/address/parse')
      .send({ address: '123 Main St, Springfield' })
      .expect(201)
      .expect(res => {
        expect(res.body.components).toBeDefined();
      });
  });

  it('/address/normalize (POST)', () => {
    return request(app.getHttpServer())
      .post('/address/normalize')
      .send({ address: '123 Main St, Springfield' })
      .expect(201)
      .expect(res => {
        expect(res.body.normalized).toBeDefined();
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
