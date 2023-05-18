import { Injectable } from '@nestjs/common';
import { Twel } from './entities/Twel.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTwelDto } from './dto/create-twel.dto';
import { User } from 'src/auth/entities/User.entity';
import { v4 as uuid } from 'uuid';
import { UpdateTwelDto } from './dto/update-twel.dto';
@Injectable()
export class TwelService {
  constructor(
    @InjectRepository(Twel)
    private twelRepository: Repository<Twel>,
  ) {}

  async findAll(category: string) {
    return this.twelRepository.find({ where: { category } });
  }

  async findById(id: string) {
    return this.twelRepository.findOne({ where: { id } });
  }

  async create(createTwelDto: CreateTwelDto, user: User) {
    const { category, title, content } = createTwelDto;

    const twel = Twel.create({
      id: uuid(),
      category,
      title,
      content,
      user,
    });

    return this.twelRepository.save(twel);
  }

  async update(twel: Twel) {
    return this.twelRepository.save(twel);
  }

  async delete(id: string) {
    return this.twelRepository.delete(id);
  }
}
