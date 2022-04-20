// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Room } from '../room/entities/room.entity';
// import { Image } from './entities/image.entity';

// @Injectable()
// export class ImageService {
//   constructor(
//     @InjectRepository(Image)
//     private readonly imageRepository: Repository<Image>,
//     @InjectRepository(Room)
//     private readonly roomRepository: Repository<Room>,
//   ) {}

//   async findOne({ id }) {
//     await this.imageRepository.findOne({ id });
//   }

//   async findAll({ roomId }) {
//     const resulteAllImage = await this.imageRepository.find({
//       room: roomId,
//     });
//     return resulteAllImage;
//   }

//   async create({ urls, roomId, placeId }) {
//     const result = await this.roomRepository.findOne({ id: roomId });
//     // console.log('========gg=============================');
//     // console.log(room);
//     // console.log(`roomId: ${room.id}`);
//     // console.log('=====================================');

//     urls.map((url) => {
//       return this.imageRepository.save({
//         room: result,
//         placeId,
//         url: url,
//       });
//     });
//   }

//   async update({ urls, roomId, placeId }) {
//     const result = await this.imageRepository.softDelete({
//       room: roomId,
//     });

//     urls.map((url) => {
//       return this.imageRepository.save({
//         room: roomId,
//         placeId,
//         url: url,
//       });
//     });
//   }

//   async delete({ roomId }) {
//     const result = await this.imageRepository.findOne({ id: roomId });
//     const urlSpilt = result.url.split('/');
//     const fileName = urlSpilt[urlSpilt.length - 1];
//     const storage = new Storage({
//       keyFilename: process.env.STORAGE_KEY_FILENAME,
//       projectId: process.env.STORAGE_PROJECT_ID,
//     });
//     await storage.bucket(process.env.STORAGE_BUCKET).file(fileName).delete();
//     const result1 = await this.imageRepository.softDelete({
//       id: roomId,
//     });
//     return result.affected ? true : false;
//   }
// }
