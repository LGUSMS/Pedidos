"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const node_path_1 = __importDefault(require("node:path"));
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const createCategory_1 = require("./app/useCases/categories/createCategory");
const listCategories_1 = require("./app/useCases/categories/listCategories");
const listProducts_1 = require("./app/useCases/products/listProducts");
const createProducts_1 = require("./app/useCases/products/createProducts");
const listProductsByCategories_1 = require("./app/useCases/categories/listProductsByCategories");
const listOrders_1 = require("./app/useCases/orders/listOrders");
const createOrder_1 = require("./app/useCases/orders/createOrder");
const changeOrderStatus_1 = require("./app/useCases/orders/changeOrderStatus");
const cancelOrder_1 = require("./app/useCases/orders/cancelOrder");
const DeleteProducts_1 = require("./app/useCases/products/DeleteProducts");
exports.router = (0, express_1.Router)();
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({ destination(req, file, callback) {
            callback(null, node_path_1.default.resolve(__dirname, '..', 'uploads'));
        },
        filename(req, file, callback) {
            callback(null, `${Date.now()}-${file.originalname}`);
        }
    }),
});
exports.router.get('/categories', listCategories_1.listCategories);
exports.router.post('/categories', createCategory_1.createCategory);
exports.router.get('/products', listProducts_1.listProducts);
exports.router.delete('/products/:productId', DeleteProducts_1.deleteProducts);
exports.router.post('/products', upload.single('image'), createProducts_1.createProducts);
exports.router.get('/categories/:categoryId/products', listProductsByCategories_1.listProductsByCategory);
exports.router.get('/orders', listOrders_1.listOrders);
exports.router.post('/orders', createOrder_1.createOrder);
exports.router.patch('/orders/:orderId', changeOrderStatus_1.changeOrderStatus);
exports.router.delete('/orders/:orderId', cancelOrder_1.cancelOrder);
