import { Request, } from 'restify';

export interface DateModel {
    updatedAt?: Date;
    createdAt?: Date;
}

export interface RequestCustom extends Request {
    userId?: string;
}

