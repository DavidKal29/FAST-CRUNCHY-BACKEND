import { Body, Controller, Post,Req, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Request } from 'express';

@Controller('orders')
export class OrdersController {
    constructor (private readonly ordersService:OrdersService){}

    @Post('createorder')
    createOrder(@Req() req:Request, @Body('order') order:object){
        return this.ordersService.createOrder(req,order)
    }

    @Get('getOrders')
    getOrder(@Req() req:Request){
        return this.ordersService.getOrders(req)
    }

    @Get('deleteOrder/:id_order')
    deleteOrder(@Req() req:Request, @Param('id_order') id_order:string){
        return this.ordersService.deleteOrder(req,id_order)
    }
}
