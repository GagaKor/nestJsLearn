import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateBaordDto } from './dto/create-Board.Dto';
import { Board } from './entiies/Board.entity';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(Board)
        private boardRepository: Repository<Board>
    ){};
    
    findAll():Promise<Board[]>{
        return this.boardRepository.find();
    }
    findByTitleOrContent(data): Promise<Board[]>{
        return this.boardRepository.find({
            where: [
                {title: Like(`%${data}%`)},
                {content:Like(`%${data}%`)}
            ]
        });
    }
    async create(data : CreateBaordDto):Promise<void>{
        console.log(data);
        await this.boardRepository.save(data);
    }
}
