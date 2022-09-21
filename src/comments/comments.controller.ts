import { Body, Controller, Post, UseGuards, Get, Param, Patch } from "@nestjs/common";
import { CreateCommnetDto } from "./dto/create-Comment.dto";
import { AuthGuard } from "./../auth/security/auth.guard";
import { GetUser } from "src/decorator/get-user.decorator";
import { User } from "./../auth/entities/User.entity";
import { CommentsService } from "./comments.service";

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
  updateComment(@Param("id") id: number, @Body() createCommentDto: CreateCommnetDto, @GetUser() user: User) {
    return this.commentsService.updateComment(id, createCommentDto, user);
  }
}
