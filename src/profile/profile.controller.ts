import { Controller,Get,Req,Post,Body } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { RegisterDTO } from 'src/auth/dto/register.dto';
import type { Request } from 'express';

@Controller('profile')
export class ProfileController {
    constructor (private readonly profileService: ProfileService){}


    @Get('profile')
    async profile(@Req() req:Request){
        const result  = this.profileService.profile()

        if (result.success) {
            return {success:'Usuario logueado',user:req.user}
        }
    }

    @Post('editProfile')
    editProfile(@Req() req:Request, @Body() dto:RegisterDTO){
        return this.profileService.editProfile(req,dto)
    }



}
