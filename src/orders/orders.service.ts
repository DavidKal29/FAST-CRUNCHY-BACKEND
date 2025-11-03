import { Injectable } from '@nestjs/common';
import {conectarDB} from '../../src/database/mongo.js'
import { ObjectId } from 'mongodb';
import { Request } from 'express';

@Injectable()
export class OrdersService {
    async createOrder(req:Request, order:object){
        try {
            const db = await conectarDB()
            const orders = db.collection('orders')

            console.log(order);  

            const userID = req.user?._id

            await orders.insertOne({id_user: new ObjectId(userID),order:order})

            return {success:'¡Pedido completado con éxito!'}
        } catch (error) {
            console.log(error);

            return {error:'Error al completar el pedido'}
            
        }
        

    }
}
