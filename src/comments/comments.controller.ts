import { Body, Delete, Controller, Post, UseGuards, Get, Param, Patch } from "@nestjs/common";
import { CreateCommnetDto } from "./dto/create-Comment.dto";
import { AuthGuard } from "src/auth/security/auth.guard";
import { GetUser } from "src/decorator/get-user.decorator";
import { User } from "src/auth/entities/User.entity";
import { CommentsService } from "src/comments/comments.service";
import { UpdateCommnetDto } from "src/comments/dto/update-Comment.dto";

@Controller("comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(AuthGuard)
  createComment(@Body() createCommentDto: CreateCommnetDto, @GetUser() user: User) {
    return this.commentsService.create(createCommentDto, user);
  }
  @Patch("/:id")
  @UseGuards(AuthGuard)
  updateComment(@Param("id") id: string, @Body() updateCommnetDto: UpdateCommnetDto, @GetUser() user: User) {
    return this.commentsService.updateComment(id, updateCommnetDto, user);
  }
  @Delete("/:id")
  @UseGuards(AuthGuard)
  deleteComment(@Param("id") id: string, @GetUser() user: User) {
    return this.commentsService.deleteComment(id, user);
  }
}
