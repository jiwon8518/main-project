import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { RoomService } from '../room/room.service';
import { Image } from './entities/image.entity';
import { ImageService } from './image.service';

@Resolver()
export class ImageResolver {
  constructor(
    private readonly imageService: ImageService, //
    private readonly roomService: RoomService, //
  ) {}

  @Query(() => [Image])
  async fetchImages(
    @Args('roomId') roomId: string, //
  ) {
    return await this.imageService.findAll({ roomId });
  }

  // // create
  // @Mutation(() => Image)
  // async createImage(
  //   @Args({ name: 'urls', type: () => [String] }) urls: String[], //
  //   @Args('roomId') roomId: string, //
  //   @Args('placeId') placeId: string, //
  // ) {
  //   // const room = await this.roomService.findOne({ roomId });
  //   // console.log('=====================================');
  //   // console.log(room);
  //   // console.log('=====================================');
  //   // console.log('roomId', roomId);
  //   // console.log('url', url);
  //   // console.log('placeId', placeId);
  //   // console.log('=====================================');

  //   await this.imageService.delete({ urls, roomId });

  //   return await this.imageService.create({ urls, roomId, placeId });
  // }

  @Mutation(() => [String])
  async uploadImages(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[], //
  ) {
    return await this.imageService.uploads({ files });
  }
}
