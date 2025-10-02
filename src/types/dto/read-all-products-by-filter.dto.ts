import { Product } from "../product.interface";

export interface ReadAllProductsByFilterDto {
    price?: PriceFilter;
    popularityScore?: PopularityScoreFilter;
}

interface PriceFilter {
    min?: number;
    max?: number;
}

interface PopularityScoreFilter {
    min?: number;
    max?: number;
}
