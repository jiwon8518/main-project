import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomTag } from '../roomtTag/entities/roomTag.entity';
import { SubCategory } from '../subCategory/entities/subCategory.entity';
import { CreateRoomInput } from './dto/createRoom.input';
import { UpdateRoomInput } from './dto/updateRoom.input';
import { Room } from './entities/room.entity';

interface IFindOne {
  roomId: string;
}
interface ICreate {
  createRoomInput: CreateRoomInput;
}
interface IUpdate {
  roomId: string;
  updateRoomInput: UpdateRoomInput;
}

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,

    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,

    @InjectRepository(RoomTag)
    private readonly roomTagRepository: Repository<RoomTag>,
  ) {}
  async findOne({ roomId }: IFindOne) {
    return await this.roomRepository.findOne({
      where: { id: roomId },
      relations: ['subCategory', 'roomTags'],
    });
  }

  async findAll() {
    // return await this.roomRepository.find();

    const resultOfAllRooms = await this.roomRepository.find({
      withDeleted: true, // 삭제된 데이터 가져오기
      relations: ['subCategory', 'roomTags'],
    });
    return resultOfAllRooms;
  }

  // create
  async create({ createRoomInput }: ICreate) {
    const { subCategoryId, roomTags, ...room } = createRoomInput;
    const result2 = await this.subCategoryRepository.findOne({
      id: subCategoryId,
    });

    const result3 = [];
    // 추후 for문을 map 과 Promise.all 로 최적화 할 것
    for (let i = 0; i < roomTags.length; i++) {
      const tagname = roomTags[i].replace('#', '');

      const prevTag = await this.roomRepository.findOne({
        name: tagname,
      });
      // 기존에 태그가 존재한다면
      if (prevTag) {
        result3.push(prevTag);
        //
        // 기존에 태그가 없었다면
      } else {
        const newTag = await this.roomTagRepository.save({ name: tagname });
        result3.push(newTag);
      }
    }

    return await this.roomRepository.save({
      ...room,
      // subCategory: { id: subCategoryId },
      subCategory: result2,
      roomTags: result3,
    });
  }

  // update
  async update({ roomId, updateRoomInput }: IUpdate) {
    const room = await this.roomRepository.findOne({ id: roomId });
    const newRoom = {
      ...room,
      ...updateRoomInput,
    };
    return await this.roomRepository.save(newRoom);
  }

  // softDelete 다양한 조건으로 삭제 가능
  async delete({ roomId }) {
    const result = await this.roomRepository.softDelete({ id: roomId });
    return result.affected ? true : false;
  }

  // restore
  async restore({ roomId }) {
    const result = await this.roomRepository.restore({ id: roomId });
    return result.affected ? true : false;
  }
}
