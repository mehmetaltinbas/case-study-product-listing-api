import { ReadAllProductsByFilterDto } from '../dto/read-all-products-by-filter.dto';
import { Product } from '../product.interface';

export interface ProductFilterStrategy {
    filter(
        products: Product[],
        readAllProductsByFilterDto: ReadAllProductsByFilterDto
    ): Product[];
}
