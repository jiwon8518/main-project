import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { MainCategoryService } from '../mainCategory/mainCategory.service';
import { SubCategory } from './entities/subCategory.entity';
import { SubCategoryService } from './subCategory.service';

@Resolver()
export class SubCategoryResolver {
  constructor(
    private readonly subCategoryService: SubCategoryService, // mainCategoryService: MainCategoryService,
  ) {}

  //list
  @Query(() => [SubCategory])
  async fetchSubCategorys() {
    return await this.subCategoryService.findAll();
  }

  @Query(() => SubCategory)
  async fetchSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return await this.subCategoryService.findOne({ subCategoryId });
  }

  @Mutation(() => SubCategory)
  async createSubCategory(
    @Args('name') name: string, //
    @Args('mainCategoryId') mainCategoryId: string, //
    // @Args('createSubCateroyInput') createSubCateroyInput: SubCategory, //
  ) {
    return await this.subCategoryService.create({ name, mainCategoryId });
  }

  // update
  @Mutation(() => SubCategory)
  async updateSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return await this.subCategoryService.update({
      subCategoryId,
    });
  }

  // delete
  @Mutation(() => Boolean)
  async deleteSubCategory(@Args('subCategoryId') subCategoryId: string) {
    return await this.subCategoryService.delete({ subCategoryId });
  }
}
