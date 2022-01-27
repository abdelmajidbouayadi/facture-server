import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person } from 'src/persons/entity/person';
import { Product } from 'src/products/entity/product.model';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entity/invoice';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
  ) {}

  getInvoices() {
    return this.invoiceModel
      .find()
      .populate([{ path: 'person' }, { path: 'rows.product' }])
      .exec();
  }

  async getInvoiceById(id: string) {
    const invoice = await this.invoiceModel
      .findById(id)
      .populate([{ path: 'person' }, { path: 'rows.product' }])
      .exec();
    if (!invoice)
      throw new NotFoundException(`the product with id=${id} not Found`);
    return invoice;
  }
  async getInvoiceByQuery(query: UpdateInvoiceDto) {
    return this.invoiceModel
      .find(query)
      .populate([{ path: 'rows.product' }])
      .exec();
  }

  saveInvoice(createInvoiceDto: CreateInvoiceDto) {
    const invoice = new this.invoiceModel(createInvoiceDto);
    return invoice.save();
  }
  async updateInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoice = await this.invoiceModel
      .findByIdAndUpdate(id, updateInvoiceDto, { new: true })
      .exec();
    if (!invoice) throw new NotFoundException('invoice not found');
    return invoice;
  }
  async deleteInvoice(id: string) {
    const invoice = await this.invoiceModel.findById(id).exec();
    if (!invoice) throw new NotFoundException('invoice not found');
    return invoice.remove();
  }

  getNumOfLastInsertedInvoice() {
    return this.invoiceModel.findOne().sort({ num: -1 }).select('num').exec();
  }
}
