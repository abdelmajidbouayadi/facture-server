import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PersonsModule } from 'src/persons/persons.module';
import { ProductsModule } from 'src/products/products.module';
import { Invoice, InvoiceSchema } from './entity/invoice';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Invoice.name,
        schema: InvoiceSchema,
      },
    ]),
  ],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
})
export class InvoicesModule {}
