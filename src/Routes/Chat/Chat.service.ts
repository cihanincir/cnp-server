import { Injectable } from "@nestjs/common";
import { PostMessageDto } from "./Chat.dto";
import { Messages } from "src/Database/Models/Messages.model";

@Injectable()
export class ChatService {

    async GetLastMessages() {
        return await Messages.findAll();
    }


    async PostMessage(userId: number, body: PostMessageDto) {
        
        // Create message in database
        const message = await Messages.create({
            userId,
            message: body.message
        });

        // Send message to all clients
        
    }

}