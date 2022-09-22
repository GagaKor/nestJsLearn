import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "./comments.repository";
import { CreateCommnetDto } from "./dto/create-Comment.dto";
import { User } from "./../auth/entities/User.entity";
import { BoardsService } from "./../boards/boards.service";
import { UpdateCommnetDto } from "./dto/update-Comment.dto";

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository, private readonly boardsService: BoardsService) {}
  async create(createCommnetDto: CreateCommnetDto, user: User) {
    const board = await this.boardsService.findById(createCommnetDto.boardId);
    await this.commentsRepository.createComment(createCommnetDto.comment, board, user);
  }
  async updateComment(id: number, updateCommnetDto: UpdateCommnetDto, user: User) {
    await this.commentsRepository.updateComment(id, updateCommnetDto, user);
  }
  async deleteComment(id: number, user: User) {
    await this.commentsRepository.deleteComment(id, user);
  }
}
