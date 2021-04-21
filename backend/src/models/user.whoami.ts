import { IsString } from "class-validator";

export class UserWhoami {
    @IsString()
    token: string;
}
