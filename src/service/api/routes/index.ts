import { Router, } from 'restify-router';
import ProductRoute from 'service/api/routes/product.router';

const RouterManager = new Router();

RouterManager.add('/product', ProductRoute);

export default RouterManager;
