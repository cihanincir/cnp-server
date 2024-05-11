import { Body, Controller, Post, RequestTimeoutException } from "@nestjs/common";
import { UserService } from "./User.service";
import { LoginDto, RegisterDto } from "./User.dto";

@Controller("users")
export class UserController {

    constructor(private UserService: UserService) { }

    @Post("register")
    Register(@Body() body: RegisterDto) {
        return this.UserService.Register(body);
    }

    @Post("login")
    Login(@Body() body: LoginDto) {
        return this.UserService.Login(body);
    }

}