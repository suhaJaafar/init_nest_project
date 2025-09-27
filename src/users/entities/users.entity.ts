import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from '@app/enums';

// type Relations = keyof Pick<
//   User,
//   | 'shop'
//   | 'googleAccount'
//   | 'phoneNumber'
//   | 'seed'
//   | 'location'
//   | 'image'
//   | 'favoriteShops'
//   | 'chatConversations'
//   | 'chatMessages'
// >;
// type PartialRelations = Partial<Pick<User, Relations>>;
// type CreateOmittedParams = keyof Pick<
//   User,
//   'roles' | 'displayName' | 'location'
// >;

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ format: 'uuid' })
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsEmail()
  @ApiProperty({ format: 'email', nullable: true })
  email?: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'strongPassword123!' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    array: true,
    default: [UserRole.User],
  })
  @ApiProperty({ enum: UserRole, isArray: true, default: [UserRole.User] })
  roles: UserRole[];

  @CreateDateColumn()
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;

  //   static create(
  //     data: Omit<User, ExcludedEntityFields | CreateOmittedParams | Relations> &
  //       PartialRelations,
  //   ): User {
  //     const user = new User();
  //     Object.assign(user, data);
  //     return user;
  //   }
}
