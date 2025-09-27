import { Injectable } from '@nestjs/common';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Users } from './entities/users.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DbTransactionService } from '@app/services/db-transaction.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
    private readonly dbTransactionService: DbTransactionService,
  ) {}

  create(createUsersDto: CreateUsersDto) {
    return 'This action adds a new user';
  }

  // find all users
  findAll() {
    return this.repo.find();
  }

  findOneById(
    id: string,
    options?: FindOneOptions<Users>,
  ): Promise<Users | null> {
    return this.repo.findOne({
      ...options,
      where: { ...options?.where, id },
    });
  }

  update(id: number, updateUsersDto: UpdateUsersDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
