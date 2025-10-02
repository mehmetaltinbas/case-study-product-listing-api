import { ReadAllProductsByFilterDto } from "../../types/dto/read-all-products-by-filter.dto";
import { Product } from "../../types/product.interface";
import { ProductFilterStrategy } from "../../types/strategy/product-filter.strategy.interface";

export class PopularityScoreProductFilterStrategy implements ProductFilterStrategy {
    constructor() {}

    filter(products: Product[], readAllProductsByFilterDto: ReadAllProductsByFilterDto): Product[] {
        if (!readAllProductsByFilterDto.popularityScore || (!readAllProductsByFilterDto.popularityScore.min && !readAllProductsByFilterDto.popularityScore.max)) { return products; }
        const filteredByMin = products.filter(product => {
            if (readAllProductsByFilterDto.popularityScore?.min !== undefined && readAllProductsByFilterDto.popularityScore?.min !== null && !isNaN(readAllProductsByFilterDto.popularityScore?.min)) {
                if (product.popularityScore! >= readAllProductsByFilterDto.popularityScore.min) { return true; }
                else { return false; }                    
            }
            return true;
        });
        const filteredByMax = filteredByMin.filter(product => {
            if (readAllProductsByFilterDto.popularityScore?.max !== undefined && readAllProductsByFilterDto.popularityScore?.max !== null && !isNaN(readAllProductsByFilterDto.popularityScore?.max)) {
                if (product.popularityScore! <= readAllProductsByFilterDto.popularityScore.max) { return true; }
                else { return false; }
            }
            return true;
        });
        return filteredByMax;
    }
}
