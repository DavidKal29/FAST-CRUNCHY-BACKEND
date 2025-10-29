import { Injectable } from '@nestjs/common';
import {conectarDB} from '../../src/database/mongo.js'
import { EditProfileDTO } from './dto/editProfile.js';
import { ObjectId } from 'mongodb';
import { Request } from 'express';

@Injectable()
export class ProfileService {
    profile(){
        return {success:'Entraste a perfil'}
    }

    async editProfile(req:Request, dto:EditProfileDTO){
        try {
            const db = await conectarDB()
            const users = db.collection('users')

            const userID = req.user?._id

            console.log(dto);
            

            const result = await users.updateOne({_id:new ObjectId(userID)},{$set:{email:dto.email, name:dto.name, lastname:dto.lastname, phone:dto.phone}})

            if (result.modifiedCount==0) {
                return {error:'Asegurate que al menos un campo sea distinto'}
            }

            return {success:'Datos guardados correctamente'}
        
        } catch (error) {
            console.log('Error en Edit Profile');
            
            console.log(error);
            
            return {error:'Error al editar perfil'}
        }

        



        
    }
}
