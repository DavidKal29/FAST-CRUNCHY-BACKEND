import { IsEmail } from "class-validator";

export class RecuperationEmailDTO{
    @IsEmail()
    email: string
}