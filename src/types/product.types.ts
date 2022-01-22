import { DateModel, } from './common.types';

export interface GroupType extends DateModel {
    code?: string;
    name?: string;
}

export interface ProductType extends DateModel {
    _id?: string;
    businessPartner?: string;
    category?: GroupType;
    code?: string;
    description?: string;
    financialCost?: number;
    line?: GroupType;
    manufacturerType?: string;
    mark?: string;
    minPrice?: number;
    name?: string;
    partNumber?: string;
    photo150?: string;
    photo450?: string;
    price?: number;
    status?: string;
    uen?: string;
    unit?: string;
}
