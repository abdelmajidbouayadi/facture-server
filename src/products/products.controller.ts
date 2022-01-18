import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { isInstance } from 'class-validator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.model';
import { productsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: productsService) {}
  @Post()
  addProduct(@Body() createProductDto: CreateProductDto) {
    const generatedId = this.productsService.saveProduct(createProductDto);
    return { id: generatedId };
  }

  @Get()
  getAllProducts(): Product[] {
    return this.productsService.getAllProducts();
  }
  @Get(':id')
  getParams(@Param('id') id: number) {
    console.log({ id });
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }
}
