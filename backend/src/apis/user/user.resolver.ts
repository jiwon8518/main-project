import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth-guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  //list
  @Query(() => [User])
  async fetchUsers() {
    return await this.userService.findAll();
  }

  // 반드시 로그인 필요
  @UseGuards(GqlAuthAccessGuard) // 대체
  @Query(() => String)
  async fetchUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    console.log('=====================================');
    console.log(currentUser);
    console.log('=====================================');
    console.log('실행됐습니다~');
    const userEmail = currentUser.email;
    // return '실행완료!!';
    return await this.userService.findOne({ email: userEmail });
  }

  // create
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    const { email, password, ...user } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = { password: hashedPassword, email, ...user };
    return await this.userService.create(createUser);
  }

  // update
  @UseGuards(GqlAuthAccessGuard) // 검증이 된것만 가능
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ userId, updateUserInput });
  }

  // delete
  @UseGuards(GqlAuthAccessGuard) // 검증이 된것만 가능
  @Mutation(() => Boolean)
  async deleteUser(
    @Args('userId') userId: string,
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.userService.delete({ userId });
  }
}
