import { Injectable, createParamDecorator } from "@nestjs/common";
import { ExecutionContextHost } from "@nestjs/core/helpers/execution-context-host";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import Config from "src/Config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Config.jwtSecret
        })
    }

    validate(payload: any) {
        return payload;
    }

}

export const AuthUser = createParamDecorator(async (data, context: ExecutionContextHost) => {
    const req = context.switchToHttp().getRequest();
    return req.user;
});