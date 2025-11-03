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

    async getOrders(req:Request){
        try {
            const db = await conectarDB()
            const orders = db.collection('orders')
            const userID = req.user?._id

            const userOrders = await orders.find({id_user: new ObjectId(userID)}).toArray()

            if (userOrders.length>0) {
                return {orders:userOrders}
            }else{
                return {orders:[]}
            }

            
        } catch (error) {
            console.log(error);

            return {error:'Error al obtener los pedidos del usuario'}
            
        }
        

    }
}
