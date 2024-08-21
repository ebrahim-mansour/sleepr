import { DatabaseModule } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
          { name: ReservationDocument.name, schema: ReservationSchema },
        ]),
      ],
      providers: [ReservationsService, ReservationsRepository],
    }).compile();

    service = module.get<ReservationsService>(ReservationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
