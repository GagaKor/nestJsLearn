import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommnetDto } from 'src/comments/dto/create-Comment.dto';
import { User } from 'src/auth/entities/User.entity';
import { BoardsService } from 'src/boards/boards.service';
import { UpdateCommnetDto } from 'src/comments/dto/update-Comment.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/Comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    private readonly boardsService: BoardsService,
  ) {}
  async create(createCommnetDto: CreateCommnetDto, user: User) {
    const board = await this.boardsService.findById(createCommnetDto.boardId);
    if (!user) {
      throw new UnauthorizedException();
    }

    const comment = Comment.create({
      id: uuid(),
      comment: createCommnetDto.comment,
      board,
      username: user.username,
      user,
    });

    await this.commentsRepository.save(comment);
  }

  async updateComment(
    id: string,
    updateCommnetDto: UpdateCommnetDto,
    user: User,
  ) {
    const beforeComment = await this.commentsRepository.findOneBy({ id });
    if (!beforeComment) throw new NotFoundException('Can not found comment');
    if (beforeComment.username !== user.username)
      throw new UnauthorizedException();
    const { comment } = updateCommnetDto;
    await this.commentsRepository.update(id, { comment });
  }

  async deleteComment(id: string, user: User) {
    const { username } = await this.commentsRepository.findOne({
      select: ['username'],
      where: { id },
    });
    if (username !== user.username) throw new UnauthorizedException();
    const comment = '작성자에 의해 삭제된 댓글입니다.';
    await this.commentsRepository.update(id, { comment });
  }
}
