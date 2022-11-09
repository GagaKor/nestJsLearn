import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "src/comments/comments.repository";
import { CreateCommnetDto } from "src/comments/dto/create-Comment.dto";
import { User } from "src/auth/entities/User.entity";
import { BoardsService } from "src/boards/boards.service";
import { UpdateCommnetDto } from "src/comments/dto/update-Comment.dto";

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
