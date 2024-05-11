import { Module } from "@nestjs/common";
import { UserService } from "./User.service";
import { UserController } from "./User.controller";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "src/Auth/jwt.strategy";

@Module({
    imports: [JwtModule.register({})],
    controllers: [UserController],
    providers: [UserService, JwtStrategy]
})
export class UserModule { }