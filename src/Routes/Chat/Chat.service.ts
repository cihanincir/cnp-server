import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PostMessageDto } from "./Chat.dto";
import { Messages } from "src/Database/Models/Messages.model";
import { Users } from "src/Database/Models/User.model";

@Injectable()
export class ChatService {

    async GetLastMessages() {
        return await Messages.findAll();
    }

}