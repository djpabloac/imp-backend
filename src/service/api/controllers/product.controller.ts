import ProductModel from 'datalayer/models/mongo/product.models';
import { ProductType, } from 'types/product.types';
import { readExcelToData, } from 'utils';

class BaseController {
  async get() {
    const columns = { financialCost: 0, minPrice: 0, };
    const products = await ProductModel.find().select(columns).lean();

    return products;
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
