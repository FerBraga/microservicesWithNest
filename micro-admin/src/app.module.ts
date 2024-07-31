import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './interfaces/categories/category.schema';
import { PlayerSchema } from './interfaces/players/player.schema';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://augustofbg:Ia2JhEoCpiRlQmpe@ferbragacluster.0ne5ftw.mongodb.net/admin-db?retryWrites=true&w=majority&appName=FerBragaCluster'),
    MongooseModule.forFeature([{ name: "Category", schema: CategorySchema }, { name: "Player", schema: PlayerSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
