import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import { CreateCommnetDto } from "./dto/create-Comment.dto";
import { User } from "./../auth/entities/User.entity";
import { BoardsService } from "./../boards/boards.service";

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository, private readonly boardsService: BoardsService) {}
  async create(createCommnetDto: CreateCommnetDto, user: User) {
    const board = await this.boardsService.findById(createCommnetDto.boardId);
    await this.commentsRepository.createComment(createCommnetDto.comment, board, user);
  }
  async updateComment(id: number, createCommentDto: CreateCommnetDto, user: User) {
    await this.commentsRepository.updateComment(id, createCommentDto, user);
  }
}
