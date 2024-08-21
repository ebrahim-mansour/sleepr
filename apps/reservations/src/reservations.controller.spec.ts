import { DatabaseModule } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';

import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ReservationsController } from './reservations.controller';
import { ReservationsRepository } from './reservations.repository';
import { ReservationsService } from './reservations.service';

describe('ReservationsController', () => {
  let controller: ReservationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        DatabaseModule.forFeature([
          { name: ReservationDocument.name, schema: ReservationSchema },
        ]),
      ],
      controllers: [ReservationsController],
      providers: [ReservationsService, ReservationsRepository],
    }).compile();

    controller = module.get<ReservationsController>(ReservationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
