import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { SubCategory } from './entities/subCategory.entity';

interface IFindOne {
  subCategoryId: string;
}
interface IUpdate {
  subCategoryId: string;
}

interface ICreate {
  name: string;
  mainCategoryId: string;
}

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>, //
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findAll() {
    return await this.subCategoryRepository.find({
      relations: ['mainCategory'],
    });
  }
  async findOne({ subCategoryId }: IFindOne) {
    return await this.subCategoryRepository.findOne({
      where: { id: subCategoryId },
      relations: ['mainCategory'],
    });
  }

  // async findOneMain({ subCategoryId }: IFindOne) {
  //   return await this.subCategoryRepository.findOne({ id: subCategoryId });
  // }

  async create({ name, mainCategoryId }: ICreate) {
    // 카테고리를 데이터베이스에 저장
    // await this.subCategoryRepository.save({
    //   name,
    // }); // save 등록하고 가지고 오기, create 등록하기, name: name 생략가능
    // console.log(createSubCateroyInput);
    // const { mainCategoryId, name } = createSubCateroyInput;
    const mainId = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });
    console.log('메인카테고리아이디: ' + mainId);

    return await this.subCategoryRepository.save({
      name,
      mainCategoryId: mainId,
    });
  }

  async update({ subCategoryId }: IUpdate) {
    const subCategory = await this.subCategoryRepository.findOne({
      id: subCategoryId,
    });
    const newSubCategory = {
      ...subCategory,
    };
    return await this.subCategoryRepository.save(newSubCategory);
  }

  async delete({ subCategoryId }) {
    const result = await this.subCategoryRepository.delete({
      id: subCategoryId,
    });
    return result.affected ? true : false;
  }
}
