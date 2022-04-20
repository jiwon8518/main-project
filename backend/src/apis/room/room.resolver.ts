import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateRoomInput } from './dto/createRoom.input';
import { UpdateRoomInput } from './dto/updateRoom.input';
import { Room } from './entities/room.entity';
import { RoomService } from './room.service';
import { Cache } from 'cache-manager';

@Resolver()
export class RoomResolver {
  constructor(
    private readonly roomService: RoomService, //
    private readonly elasticsearchService: ElasticsearchService,

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  //list
  @Query(() => [Room])
  async fetchRooms(
    @Args('search') search: string, //
  ) {
    // Redis에 해당 검색어에 대한 검색 결과가 캐시 되어있는지 확인
    const word = await this.cacheManager.get(search);
    if (word) {
      return search;
    } else {
      const result = await this.elasticsearchService.search({
        index: 'main_project',
        query: {
          match: { name: search },
        },
      });
      // console.log(JSON.stringify(result, null, ' '));

      const resultmap = result.hits.hits.map((ele) => {
        const arr = {};
        const resultsource = JSON.stringify(ele._source);
        const temp = JSON.parse(resultsource);
        for (let key in temp) {
          if (!key.includes('@')) arr[key] = temp[key];
        }
        return arr;
      });
      await this.cacheManager.set(search, resultmap, { ttl: 0 });
      return resultmap;
    }
    // return await this.roomService.findAll();
  }

  @Query(() => Room)
  async fetchRoom(@Args('roomId') roomId: string) {
    return await this.roomService.findOne({ roomId });
  }

  // create
  @Mutation(() => Room)
  async createRoom(@Args('createRoomInput') createRoomInput: CreateRoomInput) {
    // 엘라스틱 서치에서 등록하기 연습!! => 연습일뿐, 실제로는 MySQL에 저장할 예정!!
    this.elasticsearchService.create({
      id: 'myid',
      index: 'room',
      document: {
        ...createRoomInput,
      },
    });

    // return await this.roomService.create({ createRoomInput });
  }

  // update
  @Mutation(() => Room)
  async updateRoom(
    @Args('roomId') roomId: string,
    @Args('updateRoomInput') updateRoomInput: UpdateRoomInput,
  ) {
    return await this.roomService.update({ roomId, updateRoomInput });
  }
  // delete
  @Mutation(() => Boolean)
  async deleteRoom(@Args('roomId') roomId: string) {
    return await this.roomService.delete({ roomId });
  }

  @Mutation(() => Room)
  async restoreRoom(@Args('roomId') roomId: string) {
    return await this.roomService.restore({ roomId });
  }
}
