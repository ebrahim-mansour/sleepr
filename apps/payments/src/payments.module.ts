import {
  LoggerModule,
  NOTIFICATIONS_PACKAGE_NAME,
  NOTIFICATIONS_SERVICE_NAME,
} from '@app/common';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import { join } from 'path';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string().required(),
        NOTIFICATIONS_GRPC_URL: Joi.string().required(),
      }),
    }),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: NOTIFICATIONS_SERVICE_NAME,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.GRPC,
            options: {
              package: NOTIFICATIONS_PACKAGE_NAME,
              protoPath: join(__dirname, '../../../proto/notifications.proto'),
              url: configService.getOrThrow('NOTIFICATIONS_GRPC_URL'),
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
