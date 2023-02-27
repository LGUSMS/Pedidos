import path from 'node:path';
import {Router} from 'express';
import multer from 'multer';

import { createCategory } from './app/useCases/categories/createCategory';
import { listCategories } from './app/useCases/categories/listCategories';
import { listProducts } from './app/useCases/products/listProducts';
import {createProducts} from './app/useCases/products/createProducts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategories';
import {listOrders} from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteProducts } from './app/useCases/products/DeleteProducts';



export const router = Router();

const upload = multer({
    storage:multer.diskStorage({ destination(req, file,callback){
        callback(null,path.resolve(__dirname,'..','uploads'));

    },
    filename(req,file,callback){
        callback(null,`${Date.now()}-${file.originalname}`);
    }
    }),
});




router.get('/categories',listCategories);

router.post('/categories',createCategory);

router.get('/products', listProducts);

router.delete('/products/:productId',deleteProducts);

router.post('/products',upload.single('image'),createProducts);

router.get('/categories/:categoryId/products',listProductsByCategory);

router.get('/orders',listOrders);

router.post('/orders', createOrder);

router.patch('/orders/:orderId',changeOrderStatus);

router.delete('/orders/:orderId',cancelOrder);

