import ProductModel from 'datalayer/models/mongo/product.models';
import { ProductType, } from 'types/product.types';
import { DashboardType, } from 'types/dashboard.types';
import { readExcelToData, } from 'utils';

class BaseController {
  async get(search: string) {
    const columns = { _id: 1, description: 1, name: 1, partNumber: 1, photo450: 1, price: 1, };

    if(search) {
      const products = await ProductModel.find({ $or: [
        { name: { $options: 'i', $regex: search, }, },
        { 'category.name': { $options: 'i', $regex: search, }, },
        { 'line.name': { $options: 'i', $regex: search, }, },
        { code: { $options: 'i', $regex: search, }, },
        { partNumber: { $options: 'i', $regex: search, }, },
        { description: { $options: 'i', $regex: search, }, },
      ], }).select(columns).lean().limit(20);

      return products;
    }
    else {
      const products = await ProductModel.find({}).select(columns).lean().limit(20);

      return products;
    }
  }

  async getById(id: string) {
    const product = await ProductModel.findById(id);

    return product;
  }

  async post(inputProduct: ProductType) {
    try {
      inputProduct._id = undefined;
      const newProduct = new ProductModel(inputProduct);
      const saveProduct = await newProduct.save();

      return saveProduct;
    } catch (error) {
      throw error;
    }
  }

  async put(id: string, inputProduct: ProductType) {
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(id, inputProduct, { 'new': true, });
      if(!updateProduct) throw 'Product not found';

      return updateProduct;
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const deleteProduct = await ProductModel.findByIdAndDelete(id);

      if(!deleteProduct) throw 'Product not found';
    } catch (error) {
      throw error;
    }
  }

  async getProductsByCategory() {
    const categories = await ProductModel.aggregate([
      {
        $group: {
          _id  : '$category.name',
          count: { $sum: 1, },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const productsByCategory: DashboardType[] = [];
    for (const category of categories)
      productsByCategory.push({
        argument: category._id,
        count   : category.count,
      });

    return productsByCategory;
  }

  async getProductsByStatus() {
    const status = await ProductModel.aggregate([
      {
        $group: {
          _id  : '$status',
          count: { $sum: 1, },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const productsByCategory: DashboardType[] = [];
    for (const state of status)
      productsByCategory.push({
        argument: state._id,
        count   : state.count,
      });

    return productsByCategory;
  }

  async migrate() {
    try {
      const columnsName: string[] = [
        'code',
        'name',
        'unit',
        'price',
        'financialCost',
        'line.code',
        'category.code',
        'businessPartner',
        'status',
        'manufacturerType',
        'partNumber',
        'line.name',
        'category.name',
        'uen',
        'mark',
        'minPrice',
        'description',
        'photo150',
        'photo450',
      ];

      const dataExcel = await readExcelToData(`${__dirname}/data/products.xlsx`) || [];
      let isFirtsRowHeader = true;
      for (const sheetPage of dataExcel) {
        const { name, data, } = sheetPage;
        if(name === 'products') {
          // Format Excel to JSON
          const inputProducts: ProductType[] = [];
          for (const rowData of data) {
            if(isFirtsRowHeader) {
              isFirtsRowHeader = false;
              continue;
            }

            if(!rowData)
              continue;

            const rowDataArray = rowData as string[];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const inputProduct: any = {};
            for (const columnIndex in rowDataArray) {
              const columnValue = rowDataArray[columnIndex];
              const columnName = columnsName[columnIndex];
              const columnNameGroup = columnName.split('.');
              if(columnNameGroup.length > 1) {
                const [ groupName, subColumnsName, ] = columnNameGroup;
                inputProduct[groupName] = {
                  ...inputProduct[groupName],
                  [subColumnsName]: columnValue,
                };
              }
              else {
                inputProduct[columnName] = columnValue;
              }
            }

            inputProducts.push(inputProduct);
          }

          for (const inputProduct of inputProducts) {
            const existProduct = await ProductModel.exists({ code: inputProduct.code, });
            if(!existProduct) {
              const newProduct = new ProductModel(inputProduct);
              await newProduct.save();
            }
          }
        }
      }
    } catch (error) {
      throw error;
    }
  }
}

const ProductController = new BaseController();

export default ProductController;
