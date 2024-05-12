import { Controller, Get, UseGuards } from "@nestjs/common";
import { ChatService } from "./Chat.service";
import { AuthGuard } from "@nestjs/passport";

@Controller("chat")
export class ChatController {

    constructor(private ChatService: ChatService) { }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    GetLastMessages() {
        return this.ChatService.GetLastMessages();
    }

}