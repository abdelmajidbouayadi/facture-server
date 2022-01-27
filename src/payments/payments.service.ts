import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entity/payment.model';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private PaymentModel: Model<Payment>,
  ) {}
  async savePayment(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const lastPayment = await this.PaymentModel.findOne({
      type: createPaymentDto.type,
    })
      .sort({ num: -1 })
      .exec();
    const paymentDto = {
      num: lastPayment?.num ? lastPayment.num + 1 : 1,
      ...createPaymentDto,
    };
    const payment = new this.PaymentModel(paymentDto);
    return (await payment.save()).populate('person');
  }

  async getAllPayments(): Promise<Payment[]> {
    return this.PaymentModel.find().populate('person');
  }
  async getAllPaymentsByQuery(query: UpdatePaymentDto): Promise<Payment[]> {
    return this.PaymentModel.find(query).populate('person');
  }
  async getPaymentById(id: string) {
    const payment = await this.PaymentModel.findById(id)
      .populate('person')
      .exec();
    if (!payment) throw new NotFoundException('payment not found');
    return payment;
  }

  async updatePayment(id: string, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.PaymentModel.findByIdAndUpdate(
      id,
      updatePaymentDto,
      { new: true },
    ).exec();
    if (!payment) throw new NotFoundException('not found payment');

    return payment;
  }

  async deletePaymentById(id: string) {
    const payment = await this.PaymentModel.findById(id).exec();
    if (!payment) throw new NotFoundException('Payment not found');
    return payment.remove();
  }
}
