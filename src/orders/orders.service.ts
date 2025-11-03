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
                const finalOrders = [...userOrders].reverse()
                return {orders:finalOrders}
            }else{
                return {orders:[]}
            }

            
        } catch (error) {
            console.log(error);

            return {error:'Error al obtener los pedidos del usuario'}
            
        }
        
    }

    async deleteOrder(req:Request,id_order:string){
        try {
            const db = await conectarDB()
            const orders = db.collection('orders')

            const userID = req.user?._id

            const order_exists = await orders.findOne({id_user:new ObjectId(userID),_id:new ObjectId(id_order)})

            if (order_exists) {
                await orders.deleteOne({_id:new ObjectId(id_order)})  

                return {success:'Pedido borrado con éxito'}
            
            }else{
                console.log('Pedido inexistente');
                
                return {error:'El pedido que intentas eliminar no existe'}
            }       
            
        } catch (error) {
            console.log(error);
            
            return {error:'Error al eliminar el pedido'}   
        }
    }
}
