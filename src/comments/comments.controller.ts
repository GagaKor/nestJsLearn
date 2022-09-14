import { Body, Controller, Post } from "@nestjs/common";
import { Comment } from "src/comments/entities/Comment.entity";

@Controller("comments")
export class CommentsController {
  @Post()
  create(@Body() comment: Comment) {
    console.log(comment);
  }
}
