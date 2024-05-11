import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ChatService } from "./Chat.service";
import { AuthGuard } from "@nestjs/passport";
import { AuthUser } from "src/Auth/jwt.strategy";
import { IAuthUser } from "src/Interfaces/AuthTokenUser";
import { PostMessageDto } from "./Chat.dto";

@Controller("chat")
export class ChatController {

    constructor(private ChatService: ChatService) { }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    GetLastMessages() {
        return this.ChatService.GetLastMessages();
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    PostMessage(@AuthUser() user: IAuthUser, @Body() body: PostMessageDto) {
        return this.ChatService.PostMessage(user.userId, body);
    }

}