//-- 서브카테고리 --//
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Field, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';

@Entity()
@ObjectType()
export class SubCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  // @Column()
  // @Field(() => String)
  // mainCategoryId: string;

  // 소프트 삭제(TypeORM 제공)
  @DeleteDateColumn()
  deleteAt: Date;

  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' }) // 여러개 상품, 하나의 카테고리
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
