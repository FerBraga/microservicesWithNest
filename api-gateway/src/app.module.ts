import { Module } from '@nestjs/common';
import { CategoriesModule } from './categories/categories.module';
import { PlayersModule } from './players/players.module';
import { CategoriesController } from './categories/categories.controller';
import { PlayersController } from './players/players.controller';

@Module({
  imports: [CategoriesModule, PlayersModule],
  controllers: [CategoriesController, PlayersController],
  providers: [],
})
export class AppModule { }
