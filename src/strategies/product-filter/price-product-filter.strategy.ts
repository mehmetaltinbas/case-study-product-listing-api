import { ReadAllProductsByFilterDto } from "../../types/dto/read-all-products-by-filter.dto";
import { Product } from "../../types/product.interface";
import { ProductFilterStrategy } from "../../types/strategy/product-filter.strategy.interface";

export class PriceProductFilterStrategy implements ProductFilterStrategy {
    constructor() {}

    filter(products: Product[], readAllProductsByFilterDto: ReadAllProductsByFilterDto): Product[] {
        if (!readAllProductsByFilterDto.price || (!readAllProductsByFilterDto.price.min && !readAllProductsByFilterDto.price.max)) { return products; }
        const filteredByMin = products.filter(product => {
            if (readAllProductsByFilterDto.price?.min !== undefined && readAllProductsByFilterDto.price?.min !== null && !isNaN(readAllProductsByFilterDto.price?.min)) {
                if (product.price! >= readAllProductsByFilterDto.price.min) { return true; }
                else { return false; }                    
            }
            return true;
        });
        const filteredByMinAndMax = filteredByMin.filter(product => {
            if (readAllProductsByFilterDto.price?.max !== undefined && readAllProductsByFilterDto.price?.max !== null && !isNaN(readAllProductsByFilterDto.price?.max)) {
                if (product.price! <= readAllProductsByFilterDto.price.max) { return true; }
                else { return false; }
            }
            return true;
        });
        return filteredByMinAndMax;
    }
}
