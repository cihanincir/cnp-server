import { WebSocketTransport } from "@colyseus/ws-transport";
import { OnApplicationShutdown } from "@nestjs/common";
import { Room, Server } from "colyseus";
import * as http from "http";

type Type<T> = new (...args: any[]) => T

export class SocketService implements OnApplicationShutdown {

    server: Server = null;

    createServer(httpServer: http.Server) {
        if (this.server) return;
        this.server = new Server({
            transport: new WebSocketTransport({
                server: httpServer
            }),
            greet: false
        });
    }

    defineRoom(name: string, room: Type<Room<any, any>>) {
        this.server.define(name, room);
    }

    async listen(port: number): Promise<number> {
        if (!this.server) return;
        await this.server.listen(port);
        console.log("Socket server listening on", port);
    }

    onApplicationShutdown(signal?: string) {
        if (!this.server) return;
        console.info(`[SIG] Caught signal ${signal}. Socket service shutting down on ${new Date()}.`)
        this.server.gracefullyShutdown();
    }

}