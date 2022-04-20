import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/mainCategory.entity';

interface IFindOne {
  mainCategoryId: string;
}
interface IUpdate {
  mainCategoryId: string;
  name: string;
}

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findAll() {
    return await this.mainCategoryRepository.find();
  }
  async findOne({ mainCategoryId }: IFindOne) {
    return await this.mainCategoryRepository.findOne({
      where: { id: mainCategoryId },
      relations: ['mainCategory'],
    });
  }

  async findOneMain({ mainCategoryId }: IFindOne) {
    return await this.mainCategoryRepository.findOne({ id: mainCategoryId });
  }

  async create({ name }) {
    // 카테고리를 데이터베이스에 저장
    await this.mainCategoryRepository.save({ name }); // save 등록하고 가지고 오기, create 등록하기, name: name 생략가능
  }

  async update({ mainCategoryId, name }: IUpdate) {
    const mainIdFind = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });
    console.log('수정될 메인 카테고리이름: ' + name);
    console.log('메인 아이디: ' + mainIdFind);

    const newMainCategory = {
      name,
      ...mainIdFind,
    };
    return await this.mainCategoryRepository.save(newMainCategory);
  }
}
