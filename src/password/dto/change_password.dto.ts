import { IsString } from "class-validator";

export class ChangePasswordDTO{
    
    @IsString()
    new_password: string;

    @IsString()
    confirm_password: string;

}