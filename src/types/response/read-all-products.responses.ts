import { Product } from '../product.interface';
import { ResponseBase } from './response-base';

export interface ReadAllProductsResponse extends ResponseBase {
    products?: Product[];
}
