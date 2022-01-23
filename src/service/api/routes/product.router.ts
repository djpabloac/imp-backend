import { Response, } from 'restify';
import { Router, } from 'restify-router';
import ProductController from 'service/api/controllers/product.controller';
import { ProductType, } from 'types/product.types';

const ProductRoute = new Router();

ProductRoute.get(
  '/alls/:search',
  async (req, res): Promise<Response> => {
    try {
      const { search, }: { search: string; } = req.params;
      const response = await ProductController.get(search);

      return res.json({ data: response, success: true, });
    } catch (error) {
      return res.json({ data: [], success: false, });
    }
  }
);

ProductRoute.get(
  '/:id',
  async (req, res): Promise<Response> => {
    try {
      const { id, }: { id: string; } = req.params;
      const response = await ProductController.getById(id);

      return res.json({ data: response, success: true, });
    } catch (error) {
      return res.json({ data: {}, success: false, });
    }
  }
);

ProductRoute.post(
  '/',
  async (req, res): Promise<Response> => {
    try {
      const inputProduct: ProductType = req.body;
      const response = await ProductController.post(inputProduct);

      return res.json({ data: response, success: true, });
    } catch (error) {
      return res.json({ data: {}, success: false, });
    }
  }
);

ProductRoute.put(
  '/:id',
  async (req, res): Promise<Response> => {
    try {
      const { id, }: { id: string; } = req.params;
      const inputProduct: ProductType = req.body;
      const response = await ProductController.put(id, inputProduct);

      return res.json({ data: response, success: true, });
    } catch (error) {
      return res.json({ data: {}, success: false, });
    }
  }
);

ProductRoute.del(
  '/:id',
  async (req, res): Promise<Response> => {
    try {
      const { id, }: { id: string; } = req.params;
      await ProductController.delete(id);

      return res.json({ data: 'Deleted success', success: true, });
    } catch (error) {
      throw error;
    }
  }
);

ProductRoute.get(
  '/bycategory',
  async (req, res): Promise<Response> => {
    try {
      const response = await ProductController.getProductsByCategory();

      return res.json({ data: response, success: true, });
    } catch (error) {
      return res.json({ data: [], success: false, });
    }
  }
);

ProductRoute.get(
  '/bystatus',
  async (req, res): Promise<Response> => {
    try {
      const response = await ProductController.getProductsByStatus();

      return res.json({ data: response, success: true, });
    } catch (error) {
      return res.json({ data: [], success: false, });
    }
  }
);

ProductRoute.post(
  '/migrate',
  async (req, res): Promise<Response> => {
    try {
      await ProductController.migrate();

      return res.json({ data: 'Migrate success', success: true, });
    } catch (error) {
      throw error;
    }
  }
);

export default ProductRoute;
