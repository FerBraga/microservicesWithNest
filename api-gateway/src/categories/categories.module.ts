import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { ClientProxyService } from 'src/proxyrmq/client-proxy';

@Module({
  controllers: [CategoriesController],
  imports: [ClientProxyService]
})
export class CategoriesModule { }
