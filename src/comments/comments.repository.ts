import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Comment } from "./entities/Comment.entity";
import { Repository } from "typeorm";
import { User } from "./../auth/entities/User.entity";
import { UnauthorizedException } from "@nestjs/common";
import { Board } from "./../boards/entities/Board.entity";

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
}
