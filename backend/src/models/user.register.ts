import { IsEmail, IsString } from 'class-validator';

export class User {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    name: string;
}