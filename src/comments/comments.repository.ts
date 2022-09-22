import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Comment } from "./entities/Comment.entity";
import { Repository } from "typeorm";
import { User } from "./../auth/entities/User.entity";
import { UnauthorizedException } from "@nestjs/common";
import { Board } from "./../boards/entities/Board.entity";
import { NotFoundException } from "@nestjs/common";
import { UpdateCommnetDto } from "./dto/update-Comment.dto";

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

  async updateComment(id: number, updateCommnetDto: UpdateCommnetDto, user: User) {
    const beforeComment = await this.findOneBy({ id });
    if (!beforeComment) throw new NotFoundException("Can not found comment");
    if (beforeComment.username !== user.username) throw new UnauthorizedException();
    const { comment } = updateCommnetDto;
    await this.update(id, { comment });
  }

  async deleteComment(id: number, user: User) {
    const { username } = await this.findOne({ select: ["username"], where: { id } });
    if (username !== user.username) throw new UnauthorizedException();
    const comment = "작성자에 의해 삭제된 댓글입니다.";
    await this.update(id, { comment });
  }
}
