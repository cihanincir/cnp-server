import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { LoginDto, RegisterDto } from "./User.dto";
import { Users } from "src/Database/Models/User.model";
import { JwtService } from "@nestjs/jwt";
import Config from "src/Config";

@Injectable()
export class UserService {

    constructor(private jwt: JwtService) { }

    private async signToken(userId: number) {
        return await this.jwt.signAsync({ userId }, {
            expiresIn: "1y",
            secret: Config.jwtSecret
        });
    }

    async Register(body: RegisterDto) {

        // Check username exist
        const usernameCount = await Users.count({ where: { username: body.username } });
        if (usernameCount > 0) {
            throw new BadRequestException(`The user ${body.username} is already registered.`);
        }

        await Users.create({ ...body });

    }

    async Login(body: LoginDto) {

        const user = await Users.findOne({
            where: {
                username: body.username,
                password: body.password
            }
        });

        if (!user) {
            throw new NotFoundException("Your information does not match our records.");
        }

        const token = await this.signToken(user.userId);
        return { token };
        
    }

}