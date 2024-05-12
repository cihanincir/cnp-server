import { Room } from "colyseus";

export interface IChatRoomActions {
    broadcast: (type: string | number, message?: any, options?: any) => void
}