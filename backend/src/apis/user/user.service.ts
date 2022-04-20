import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { User } from './entities/user.entity';
// import * as bcrypt from 'bcrypt';

interface ICreate {
  createUserInput: CreateUserInput;
}

// interface IFindOne {
//   userId: string;
// }

interface IUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find({});
  }

  // async findOne({ userId }: IFindOne) {
  async findOne({ email }) {
    console.log('😁 findOne userEmail: ' + email);

    return await this.userRepository.findOne({
      email,
    });
  }
  //name,nickName,phoneNumber,email,password
  // create
  // async create({ createUserInput }: ICreate) {
  async create(createUser: CreateUserInput) {
    // const { email, password, ...user } = createUser;
    const { email, ...user } = createUser;

    const isUserEmail = await this.userRepository.findOne({
      email,
    });

    // const hashedPassword = await bcrypt.hash(password, 10);
    //const hashedPassword = password;

    console.log('입력한 이메일 : ' + email);
    console.log('이메일 여부 : ' + isUserEmail);
    //console.log(`입력 비밀번호2 :  ${password}`);
    //console.log(`해쉬 비밀번호 :  ${hashedPassword}`);

    if (isUserEmail) {
      throw new HttpException(
        '이미 등록된 email 입니다',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      return await this.userRepository.save({
        ...user, //
        email: email,
      });
    }
  }

  // update
  async update({ userId, updateUserInput }: IUpdate) {
    const user = await this.userRepository.findOne({ id: userId });
    const newUser = {
      ...user,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }

  // softDelete 다양한 조건으로 삭제 가능
  async delete({ userId }) {
    const result = await this.userRepository.delete({ id: userId });
    return result.affected ? true : false;
  }
}
