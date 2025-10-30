import { Injectable } from '@nestjs/common';
import {conectarDB} from '../../src/database/mongo.js'
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {
    async getProducts(category:string){
        try {
            const db = await conectarDB()
            const products = db.collection('products')

            console.log('Buscando productos de',category);
            

            const category_products = await products.find({category:category}).toArray()

            console.log(category_products);
            

            if (category_products) {
                return {products:category_products}
            }else{
                return {error:'No se han encontrado productos de la categoria',category}
            }

        } catch (error) {
            return {error:'Error al obtener los productos de la categoria',category}
        }

    }
}
