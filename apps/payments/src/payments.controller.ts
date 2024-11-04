import {
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
} from '@app/common';
import { Controller, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentsCreateChargeDto } from './dto/payments-create-charge.dto';
import { PaymentsService } from './payments.service';

@Controller()
@PaymentsServiceControllerMethods()
// using proto, this decorator is responsible to automatically add all the necessary metadata to the createCharge method
// so that when the incoming message using gRPC comes into this controller, it will go to the correct function
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UsePipes(new ValidationPipe())
  async createCharge(data: PaymentsCreateChargeDto) {
    return this.paymentsService.createCharge(data);
  }
}
