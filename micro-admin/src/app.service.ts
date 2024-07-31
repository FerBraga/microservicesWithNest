import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/categories/category.interface';


@Injectable()
export class AppService {
  constructor(@InjectModel('Category') private readonly categoryModel: Model<Category>) { }

  private readonly logger = new Logger(AppService.name);

  async createCategory(createCategory: Category): Promise<Category> {

    try {

      const categoryCreated = this.categoryModel.create(createCategory);

      return categoryCreated;
    } catch (err) {
      this.logger.error(`${err.message} erro aqui`)
      throw new RpcException(err.mesasge)
    }
  }

  async getCategoryById(_id: string): Promise<Category> {

    try {
      const categoryFound = await this.categoryModel.findOne({ _id }).exec();

      if (categoryFound === null) {
        throw new BadRequestException('Category does not exist');
      }

      return categoryFound;
    } catch (err) {
      this.logger.error(err.message)
      throw new RpcException(err.mesasge)
    }
  }

  async getCategories(): Promise<Array<Category>> {

    try {

      return await this.categoryModel.find();

    } catch (err) {
      this.logger.error(err.message)
      throw new RpcException(err.mesasge)
    }
  }

  async updateCategory(data): Promise<void> {

    try {

      const { id, category } = data;

      await this.categoryModel.updateOne({ _id: id }, category);

    } catch (err) {
      this.logger.error(err.message)
      throw new RpcException(err.mesasge)
    }
  }

}
