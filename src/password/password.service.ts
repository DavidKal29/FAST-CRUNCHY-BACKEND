import { Injectable } from '@nestjs/common';
import { ChangePasswordDTO } from './dto/change_password.dto';
import { RecuperationEmailDTO } from './dto/recuperation_email.dto';
import { conectarDB } from '../../src/database/mongo.js';
import { apiInstance } from '../../src/brevo/brevo.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv"

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
}
