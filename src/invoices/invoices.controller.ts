import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { TypeInvoice } from './entity/invoice';
import { InvoicesService } from './invoices.service';

@Controller('api/invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get()
  getInvoices() {
    return this.invoicesService.getInvoices();
  }
  @Get('lastnum/type/:type')
  getLastNum(@Param('type') type: TypeInvoice) {
    return this.invoicesService.getNumOfLastInsertedInvoice(type);
  }
  @Post('search')
  getInvoiceByQuery(@Body() query: UpdateInvoiceDto) {
    return this.invoicesService.getInvoiceByQuery(query);
  }
  @Get('type/:type')
  getPersonByType(@Param('type') type: TypeInvoice) {
    return this.invoicesService.getInvoicesByType(type);
  }
  @Get(':id')
  getInvoiceById(@Param('id') id: string) {
    return this.invoicesService.getInvoiceById(id);
  }

  @Post()
  saveInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoicesService.saveInvoice(createInvoiceDto);
  }

  @Patch(':id')
  updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ) {
    return this.invoicesService.updateInvoice(id, updateInvoiceDto);
  }

  @Delete(':id')
  deleteInvoice(@Param('id') id: string) {
    return this.invoicesService.deleteInvoice(id);
  }
}
