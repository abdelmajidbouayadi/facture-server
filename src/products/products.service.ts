import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.model';

@Injectable()
export class productsService {
  private products: Product[] = [];

  saveProduct(createProductDto: CreateProductDto) {
    const product = new Product(
      this.products.length,
      createProductDto.title,
      createProductDto.description,
      createProductDto.price,
    );

    this.products.push(product);
    return product.id;
  }

  getAllProducts() {
    return [...this.products];
  }

  getProductById(id: number) {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new NotFoundException('product not found');
    return product;
  }
  updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new NotFoundException('not found product');

    if (updateProductDto.description)
      product.description = updateProductDto.description;
    if (updateProductDto.price) product.price = updateProductDto.price;
    if (updateProductDto.title) product.title = updateProductDto.title;
    return product;
  }
}
