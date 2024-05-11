import { IsNotEmpty, IsString } from "class-validator";

export class PostMessageDto {
    @IsString()
    @IsNotEmpty()
    message: string;
}