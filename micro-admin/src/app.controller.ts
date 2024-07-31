import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { Category } from './interfaces/categories/category.interface';

const ackErrors: string[] = ['E11000']

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private readonly logger = new Logger(AppService.name);

  @EventPattern('create-category')
  async createCategory(@Payload() category: Category, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef();

    const message = context.getMessage();

    try {
      await this.appService.createCategory(category);

      await channel.ack(message);
    } catch (err) {

      for (const oneError of ackErrors) {
        if (err.message.includes(oneError)) await channel.ack(message)
      }
    }
  }

  @MessagePattern('get-categories')
  async getCategories(@Payload() _id: string, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef();

    const message = context.getMessage();

    try {
      if (_id) {
        const result = await this.appService.getCategoryById(_id);

        await channel.ack(message);

        return result;

      }

      const result = await this.appService.getCategories();

      await channel.ack(message);

      return result;

    } catch (err) {
      for (const oneError of ackErrors) {
        if (err.message.includes(oneError)) await channel.ack(message)
      }
    }
  }

  @EventPattern('update-category')
  async updateCategory(@Payload() data: { id: string, category: any }, @Ctx() context: RmqContext) {

    const channel = context.getChannelRef();

    const message = context.getMessage();

    try {

      await this.appService.updateCategory(data);

      await channel.ack(message);

    } catch (err) {
      for (const oneError of ackErrors) {
        if (err.message.includes(oneError)) await channel.ack(message)
      }
    }
  }
}