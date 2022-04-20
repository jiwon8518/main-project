import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTag } from '../roomtTag/entities/roomTag.entity';
import { SubCategory } from '../subCategory/entities/subCategory.entity';
import { Room } from './entities/room.entity';
import { RoomResolver } from './room.resolver';
import { RoomService } from './room.service';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Room, //
      SubCategory,
      RoomTag,
    ]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    RoomResolver, //
    RoomService,
  ],
})
export class RoomModule {}
