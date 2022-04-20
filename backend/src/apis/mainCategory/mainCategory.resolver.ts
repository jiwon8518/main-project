import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoryService } from './mainCategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  //list
  @Query(() => [MainCategory])
  async fetchMainCategorys() {
    return await this.mainCategoryService.findAll();
  }

  @Query(() => MainCategory)
  async fetchMainCategory(@Args('mainCategoryId') mainCategoryId: string) {
    return await this.mainCategoryService.findOne({ mainCategoryId });
  }

  @Mutation(() => MainCategory)
  async createMainCategory(
    @Args('name') name: string, //
  ) {
    return await this.mainCategoryService.create({ name });
  }

  // update
  @Mutation(() => MainCategory)
  async updateMainCategory(
    @Args('mainCategoryId') mainCategoryId: string,
    @Args('name') name: string,
  ) {
    return await this.mainCategoryService.update({
      mainCategoryId,
      name,
    });
  }

  // delete
}
