import { Body, Controller, Post, UseGuards, Get, Param } from "@nestjs/common";
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
  create(@Body() createCommentDto: CreateCommnetDto, @GetUser() user: User) {
    return this.commentsService.create(createCommentDto, user);
  }
}
