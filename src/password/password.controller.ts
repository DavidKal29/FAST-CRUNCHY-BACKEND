import { Body, Controller, Param, Post } from '@nestjs/common';
import { PasswordService } from './password.service';
import { ChangePasswordDTO } from './dto/change_password.dto';
import { RecuperationEmailDTO } from './dto/recuperation_email.dto';

@Controller('password')
export class PasswordController {
    constructor (private readonly passwordService: PasswordService ){}

    @Post('forgotPassword')
    forgotPassword(@Body() dto:RecuperationEmailDTO){
        return this.passwordService.forgotPassword(dto)
    }

    @Post('changePassword/:token')
    changePassword(@Body() dto:ChangePasswordDTO, @Param('token') token:string){
        return this.passwordService.changePassword(dto,token)
    }
}
