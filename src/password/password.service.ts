import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dto/change_password.dto';
import { RecuperationEmailDTO } from './dto/recuperation_email.dto';
import { conectarDB } from '../../src/database/mongo.js';
import { apiInstance } from '../../src/brevo/brevo.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
import {compare, hash} from "bcryptjs"

dotenv.config()

@Injectable()
export class PasswordService {
    async forgotPassword(dto:RecuperationEmailDTO){
        try {
            const db = await conectarDB()
            const users = db.collection('users')

            const user_exists = await users.findOne({email:dto.email}) 

            if (user_exists) {
                const token = jwt.sign({email:dto.email},process.env.JWT_SECRET)

                await users.updateOne({email: dto.email},{$set:{token:token}})

                const sendSmtpEmail = {
                    sender: { name: "Fast&Crunchy", email: process.env.CORREO },
                    to: [{ email: dto.email }],
                    subject: "Recuperar Contraseña",
                    textContent: `Para recuperar la contraseña entra en este enlace -> ${process.env.FRONTEND_URL}/changePassword/${token}`,
                    htmlContent: `<p>Para recuperar la contraseña, entra a -> <a href="${process.env.FRONTEND_URL}/changePassword/${token}">Recuperar Contraseña</a></p>`
                };

                await apiInstance.sendTransacEmail(sendSmtpEmail)

                return {success:'Correo enviado con éxito'}

            } else {
                return {error:"No hay ninguna cuenta asociada a este correo"}
            }

        } catch (error) {
            console.error(error)
            return {error:"Error al enviar el email"}
        }
    }

    async changePassword(dto:ChangePasswordDTO, token:string){
        try{
            const db = await conectarDB()
            const users = db.collection('users')

            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            const email = decoded.email

            const userData = await users.findOne({email:email, token:token})
            
            if (userData) {
                
                if (dto.new_password===dto.confirm_password) {  
                    
                    const password_equals = await compare(dto.new_password,userData.password)
                        
                    if (password_equals) {
                        return {error:"La nueva contraseña no puede ser igual a la anterior"}
                    }else{
                        
                        const new_encripted_password = await hash(dto.new_password,10)

                        await users.updateOne({email:email},{$set:{password:new_encripted_password}})

                        await users.updateOne({email:email},{$set:{token:''}})
                            
                        return {success:"Contraseña cambiada con éxito"}
                    }
                }else{
                    
                    return {error:"Contraseñas no coinciden"}
                }
            }else{
                return {error:"Token inválido o expirado"}
            }
        }catch(error){
            console.log(error);
            
            return {error:"Token inválido o erroneo"}
        }
    }
}
