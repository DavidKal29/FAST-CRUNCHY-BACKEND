import { Controller,Get,Req,Post,Body,Param } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { EditProfileDTO } from './dto/editProfile';
import { AddressDTO } from './dto/address';
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
    editProfile(@Req() req:Request, @Body() dto:EditProfileDTO){
        return this.profileService.editProfile(req,dto)
    }

    @Get('getAddress/:id_address')
    getAddress(@Req() req:Request, @Param('id_address') id_address:string){
        return this.profileService.getAddress(req,id_address)
    }

    @Get('myAddresses')
    myAddresses(@Req() req:Request){
        return this.profileService.myAddresses(req)
    }

    @Post('addAddress')
    addAddress(@Req() req:Request, @Body() dto:AddressDTO){
        return this.profileService.addAddress(req,dto)
    }

    @Get('predeterminateAddress/:id_address')
    predeterminateAddress(@Req() req:Request, @Param('id_address') id_address:string){
        return this.profileService.predeterminateAddress(req,id_address)
    }

    @Post('editAddress/:id_address')
    editAddress(@Req() req:Request, @Body() dto:AddressDTO, @Param('id_address') id_address:string){
        return this.profileService.editAddress(req,dto,id_address)
    }

    @Get('deleteAddress/:id_address')
    deleteAddress(@Req() req:Request, @Param('id_address') id_address:string){
        return this.profileService.deleteAddress(req,id_address)
    }



}
