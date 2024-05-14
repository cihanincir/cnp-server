import { UnauthorizedException } from "@nestjs/common";
import { Client, Room } from "colyseus";
import { Messages } from "src/Database/Models/Messages.model";
import { Users } from "src/Database/Models/User.model";

export class ChatRoom extends Room {

    onCreate(options: any): void | Promise<any> {
        this.onMessage("message", async (_client, { userId, message: msg }) => {
            const user = await Users.findByPk(userId);
            if (!user) {
                throw new UnauthorizedException("User not found.");
            }

            // Create message in database
            const message = await Messages.create({
                userId,
                message: msg,
                username: user.username
            });

            this.broadcast("chat:message", message.get({ plain: true }));
        })
    }

    onJoin(client: Client): void | Promise<any> {
        this.broadcast("status:connected", this.clients.length);
    }

    onLeave(client: Client): void | Promise<any> {
        this.broadcast("status:connected", this.clients.length);
    }

}
