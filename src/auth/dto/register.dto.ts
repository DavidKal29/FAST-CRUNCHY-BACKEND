import { IsString, IsEmail, Matches,IsOptional } from "class-validator";


export class RegisterDTO {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    lastname: string;

    @Matches(/^\d+$/, { message: 'phone must contain only digits' })
    phone: string;

    @IsOptional()
    @IsString()
    password: string;


}