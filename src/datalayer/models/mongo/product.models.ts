import mongoose, { Schema, } from 'mongoose';
import { ProductType, } from 'types/product.types';

const GroupSchema = new Schema({
  code: { type: String, },
  name: { type: String, },
}, {
  _id: false,
});

const ProductSchema = new Schema({
  businessPartner : { type: String, },
  category        : { required: true,  type: GroupSchema, },
  code            : { required: true, type: String, },
  description     : { type: String, },
  financialCost   : { type: Number, },
  line            : { required: true,  type: GroupSchema, },
  manufacturerType: { type: String, },
  mark            : { type: String, },
  minPrice        : { type: Number, },
  name            : { required: true, type: String, },
  partNumber      : { required: true,  type: String, },
  photo150        : { required: true,  type: String, },
  photo450        : { required: true,  type: String, },
  price           : { required: true,  type: Number, },
  status          : { type: String, },
  uen             : { type: String, },
  unit            : { required: true,  type: String, },
}, {
  timestamps: true,
  versionKey: false,
});

ProductSchema.index({
  'category.name': 'text',
  code           : 'text',
  'line.name'    : 'text',
  name           : 'text',
  status         : 1,
});

const ProductModel = mongoose.model<ProductType & mongoose.Document>(
  'product',
  ProductSchema
);

export default ProductModel;
