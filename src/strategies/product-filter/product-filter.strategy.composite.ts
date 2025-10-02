import { ReadAllProductsByFilterDto } from '../../types/dto/read-all-products-by-filter.dto';
import { Product } from '../../types/product.interface';
import { ProductFilterStrategy } from '../../types/strategy/product-filter.strategy.interface';
import { PopularityScoreProductFilterStrategy } from './popularity-score-product-filter.strategy';
import { PriceProductFilterStrategy } from './price-product-filter.strategy';

export class ProductFilterStrategyComposite implements ProductFilterStrategy {
    private priceProductFilterStrategy: PriceProductFilterStrategy;
    private popularityScoreProductFilterStrategy: PopularityScoreProductFilterStrategy;

    constructor() {
        this.priceProductFilterStrategy = new PriceProductFilterStrategy();
        this.popularityScoreProductFilterStrategy = new PopularityScoreProductFilterStrategy();
    }

    filter(
        products: Product[],
        readAllProductsByFilterDto: ReadAllProductsByFilterDto
    ): Product[] {
        if (readAllProductsByFilterDto) {
            products = this.priceProductFilterStrategy.filter(
                products,
                readAllProductsByFilterDto
            );
            products = this.popularityScoreProductFilterStrategy.filter(
                products,
                readAllProductsByFilterDto
            );
        }
        return products;
    }
}
