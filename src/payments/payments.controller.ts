import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entity/payment.model';
import { PaymentsService } from './payments.service';

@Controller('api/payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post()
  addPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.savePayment(createPaymentDto);
  }

  @Get()
  async getAllPayments(): Promise<Payment[]> {
    return this.paymentsService.getAllPayments();
  }

  @Get(':id')
  getParams(@Param('id') id: string) {
    return this.paymentsService.getPaymentById(id);
  }

  @Patch(':id')
  updatePayment(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ) {
    return this.paymentsService.updatePayment(id, updatePaymentDto);
  }

  @Delete(':id')
  async deletePayment(@Param('id') id: string) {
    return this.paymentsService.deletePaymentById(id);
  }
}
