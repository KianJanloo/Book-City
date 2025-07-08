import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard, RolesGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Request } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';
import { OrderDto, PaginationDto, SearchDto } from 'src/common/pagination.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/helper/profilePicture.config';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query()
    query: PaginationDto & OrderDto & SearchDto,
  ) {
    return await this.productsService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(Number(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request & { user: { id: number } },
  ) {
    const userId = req.user.id;
    createProductDto.userId = userId;
    return await this.productsService.create(createProductDto);
  }

  @Put('upload-photos/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @UseInterceptors(FilesInterceptor('photos', 5, multerConfig))
  uploadPhotos(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id') productId: number,
  ) {
    return this.productsService.uploadPhotos(productId, files);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(Number(id), updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return await this.productsService.delete(Number(id));
  }
}
