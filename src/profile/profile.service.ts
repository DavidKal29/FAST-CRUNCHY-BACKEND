import { Injectable } from '@nestjs/common';
import {conectarDB} from '../../src/database/mongo.js'
import { EditProfileDTO } from './dto/editProfile.js';
import { AddressDTO } from './dto/address.js';
import { ObjectId } from 'mongodb';
import { Request,Response } from 'express';
import { cookieOptions } from '../../src/cookieOptions/cookieOptions.js';

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

            const user_exists = await users.findOne({email:dto.email})

            if (user_exists) {
                return {error:'Email ya está en uso por otro usuario'}
            }

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
    async getAddress(req:Request, id_address:string){
        try {
            const db = await conectarDB()
            const addresses = db.collection('addresses')

            const userID = req.user?._id

            const address_exists = await addresses.findOne({id_user:new ObjectId(userID), _id:new ObjectId(id_address)})

            if (address_exists) {
                console.log(address_exists);
                
                return {address:address_exists}
            }else{
                return {error:'La dirección no existe'}
            }       
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al obtener direccion'}   
        }
    }

    async myAddresses(req:Request){
        try {
            const db = await conectarDB()
            const addresses = db.collection('addresses')

            const userID = req.user?._id

            const address_exists = await addresses.find({id_user:new ObjectId(userID)}).toArray()

            if (address_exists) {
                return {addresses:address_exists}
            }else{
                return {addresses:[]}
            }       
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al obtener direcciones'}   
        }
    }

    async addAddress(req:Request, dto:AddressDTO){
        try {
            const db = await conectarDB()
            const addresses = db.collection('addresses')

            const userID = req.user?._id

            const address_exists = await addresses.findOne({
                id_user:new ObjectId(userID),
                name:dto.name,
                address:dto.address
            })

            if (address_exists) {
                return {error:'Esa dirección ya existe'}
            }

            const user_addresses = await addresses.find({id_user:new ObjectId(userID)}).toArray()

            let predetermined;

            if (user_addresses.length>0) {
                predetermined = false
            }else{
                predetermined = true
            }

            await addresses.insertOne({id_user: new ObjectId(userID), name:dto.name, address:dto.address, predetermined: predetermined})
            
            return {success:'Dirección añadida correctamente'}
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al añadir dirección'}   
        }
    }

    async predeterminateAddress(req:Request, id_address:string){
        try {
            const db = await conectarDB()
            const addresses = db.collection('addresses')

            const userID = req.user?._id

            const selectedAddress = await addresses.findOne({
                id_user: new ObjectId(userID),
                _id: new ObjectId(id_address),
                predetermined: false
            })

            if (!selectedAddress) {
                return {error:'La dirección que intentas cambiar es inexistente'}
            }

            const predeterminedAddress = await addresses.findOne({
                id_user: new ObjectId(userID),
                predetermined: true
            })

            if (predeterminedAddress) {
                await addresses.updateOne({_id: new ObjectId(predeterminedAddress._id)},{$set:{predetermined:false}})
            }

            await addresses.updateOne({_id: new ObjectId(id_address)},{$set:{predetermined:true}})
            
            return {success:'Dirección predeterminada, cambiada con éxito'}
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al cambiar la dirección'}   
        }
    }

    async editAddress(req:Request, dto:AddressDTO, id_address:string){
        try {
            const db = await conectarDB()
            const addresses = db.collection('addresses')

            const userID = req.user?._id

            const address_exists = await addresses.findOne({
                id_user:new ObjectId(userID),
                _id:new ObjectId(id_address)
            })

            if (!address_exists) {
                return {error:'Esa dirección no existe'}
            }

            const result = await addresses.updateOne({id_user: new ObjectId(userID),_id:new ObjectId(id_address)},{$set:{name:dto.name,address:dto.address}})

            if (result.modifiedCount===0) {
                return {error:'Asegurate de poner al menos un campo distinto'}
            }

            return {success:'Dirección editada correctamente'}
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al editar dirección'}   
        }
    }


    async deleteAddress(req:Request,id_address:string){
        try {
            const db = await conectarDB()
            const addresses = db.collection('addresses')

            const userID = req.user?._id

            const address_exists = await addresses.findOne({id_user:new ObjectId(userID),_id:new ObjectId(id_address)})

            if (address_exists) {
                await addresses.deleteOne({_id:new ObjectId(id_address)})

                const predeterminedAdddressExists = await addresses.findOne({id_user:new ObjectId(userID), predetermined:true})

                if (!predeterminedAdddressExists) {
                    //Le pasa el predeterminado a la primera dirección que encuentre, solo si no existe una dirección predeterminada
                    await addresses.updateOne({id_user:new ObjectId(userID)},{$set:{predetermined:true}})
                }

                

                return {success:'Dirección borrada con éxito'}
            }else{
                console.log('Dirección inexistente');
                
                return {error:'La dirección que intentas eliminar no existe'}
            }       
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al eliminar la dirección'}   
        }
    }

    async deleteProfile(req:Request, res:Response){
        try {
            const db = await conectarDB()
            const users = db.collection('users')
            const addresses = db.collection('addresses')
            const orders = db.collection('orders')
            const userID = req.user?._id

            await addresses.deleteMany({id_user: new ObjectId(userID)})

            await orders.deleteMany({id_user: new ObjectId(userID)})

            await users.deleteOne({_id:new Object(userID)})

            res.clearCookie('token',cookieOptions)

            return res.json({success:'Perfil eliminado'})

        } catch (error) {
            console.log(error);
            
            return {error:'Error al eliminar el perfil'}   
        }


    }


}
