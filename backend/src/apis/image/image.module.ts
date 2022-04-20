import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Place } from '../place/entities/place.entity';
import { Room } from '../room/entities/room.entity';
import { RoomService } from '../room/room.service';
import { RoomTag } from '../roomtTag/entities/roomTag.entity';
import { SubCategory } from '../subCategory/entities/subCategory.entity';
import { Image } from './entities/image.entity';
import { ImageResolver } from './image.resolver';
import { ImageService } from './image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Place, //
      Room,
      Image,
      SubCategory,
      RoomTag,
    ]),
  ],
  providers: [
    ImageResolver, //
    ImageService,
    RoomService,
  ],
})
export class ImageModule {}
