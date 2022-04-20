import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { Room } from '../room/entities/room.entity';
dotenv.config();

interface IFile {
  // file: FileUpload;
  files: FileUpload[];
}

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async findOne({ id }) {
    await this.imageRepository.findOne({ id });
  }

  async findAll({ roomId }) {
    const resulteAllImage = await this.imageRepository.find({
      room: roomId,
    });
    return resulteAllImage;
  }

  async upload({ file }) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const result = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () =>
          resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
        )
        .on('error', (error) => reject('error: ' + error));
    });

    return result;
  }

  async uploads({ files }: IFile) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const waitedFiles = await Promise.all(files);

    const results = Promise.all(
      waitedFiles.map((file) => {
        return new Promise((resolve, reject) => {
          file
            .createReadStream() // createReadStream()->파일입구
            .pipe(storage.file(file.filename).createWriteStream()) // pipe 는 filter 같은 메서드->통로 , createWriteStream()->출구
            .on('finish', () =>
              resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
            )
            .on('error', (error) => reject('error: ' + error));
        });
      }),
    );
    return results;
  }
}
