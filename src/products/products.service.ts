import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { orderValidator } from 'src/common/order.validator';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  getAllProducts = async (
    query: PaginationDto & {
      search: string;
      order: 'ASC' | 'DESC';
      sort: string;
    },
  ) => {
    const { limit = 10, page = 1, search, order, sort } = query;

    const where = search
      ? [{ title: ILike(`%${search}%`), description: ILike(`%${search}%`) }]
      : {};

    const allowedSortFields = ['price', 'created_at', 'title'];
    const orderBy = orderValidator({ order, sort, allowedSortFields });

    const [products, totalCount] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      where,
      order: orderBy,
    });

    return {
      products,
      totalCount,
    };
  };

  findAll = async (
    query: PaginationDto & {
      search: string;
      order: 'ASC' | 'DESC';
      sort: string;
    },
  ) => {
    return await this.getAllProducts(query);
  };

  getProductById = async (id: number) => {
    const product = await this.productRepository.findOne({ where: { id } });
    return product;
  };

  findOne = async (id: number) => {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException('Product not found.', 404);
    }
    return product;
  };

  createProduct = async (createProductDto: CreateProductDto) => {
    const newProduct = this.productRepository.create(createProductDto);
    const result = await this.productRepository.save(newProduct);
    return result;
  };

  create = async (createProductDto: CreateProductDto) => {
    await this.createProduct(createProductDto);

    return {
      success: true,
      message: 'Product created successfully.',
    };
  };

  updateProduct = async (id: number, updateProductDto: UpdateProductDto) => {
    const editedProduct = await this.productRepository.update(id, {
      ...updateProductDto,
      updated_at: new Date(),
    });

    return editedProduct;
  };

  update = async (id: number, updateProductDto: UpdateProductDto) => {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException('Product not found.', 404);
    }

    await this.updateProduct(id, updateProductDto);

    return {
      success: true,
      message: 'Product updated successfully.',
    };
  };

  deleteProduct = async (id: number) => {
    const result = await this.productRepository.delete({ id });
    return result;
  };

  delete = async (id: number) => {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException('Product not found.', 404);
    }

    await this.deleteProduct(id);
    return {
      success: true,
      message: 'Product deleted successfully.',
    };
  };
}
