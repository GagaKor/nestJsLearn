import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Comment } from "./entities/Comment.entity";
import { Repository } from "typeorm";
import { User } from "./../auth/entities/User.entity";
import { UnauthorizedException } from "@nestjs/common";
import { Board } from "./../boards/entities/Board.entity";
import { CreateCommnetDto } from "./dto/create-Comment.dto";
import { NotFoundException } from "@nestjs/common";

@CustomRepository(Comment)
export class CommentsRepository extends Repository<Comment> {
  async createComment(comment: string, board: Board, user: User) {
    if (!user) {
      throw new UnauthorizedException();
    }

    const data = this.create({
      comment,
      board,
      username: user.username,
      user,
    });

    await this.save(data);
  }

  async updateComment(id: number, createCommentDto: CreateCommnetDto, user: User) {
    const beforeComment = await this.findOneBy({ id });
    if (!beforeComment) throw new NotFoundException("Can not found comment");
    if (beforeComment.username !== user.username) throw new UnauthorizedException();
    const { comment } = createCommentDto;
  }
}
