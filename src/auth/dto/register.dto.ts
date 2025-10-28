import { IsString, IsEmail, Matches } from "class-validator";


export class RegisterDTO {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @Matches(/^\d+$/, { message: 'phone must contain only digits' })
    phone: string;

    @IsString()
    password: string;


}