import axios from 'axios';
// import productsData from '../data/products.json';
import productsData from '../data/mock-products.json';
import { Product } from '../types/product.interface';
import { ReadAllProductsResponse } from '../types/response/read-all-products.responses';
import { ProductFilterStrategyComposite } from '../strategies/product-filter/product-filter.strategy.composite';
import { ReadAllProductsByFilterDto } from '../types/dto/read-all-products-by-filter.dto';

async function readAll(): Promise<ReadAllProductsResponse> {
    // const products = await getProductsAsync();
    return { isSuccess: true, message: 'All products read!', products: productsData };
};

async function readAllByFilter(readAllProductsByFilterDto: ReadAllProductsByFilterDto): Promise<ReadAllProductsResponse> {
    // const products = await getProductsAsync();
    const productFilterStrategyComposite = new ProductFilterStrategyComposite();
    const filteredProducts = productFilterStrategyComposite.filter(productsData ,readAllProductsByFilterDto);
    return { isSuccess: true, message: 'all products read by given filters', products: filteredProducts };
}

async function getProductsAsync(): Promise<Product[]> {
    const goldPricePerGramUSD = await getGoldPricePerGramUSDAsync();
    productsData.forEach((product: Product) => {
        product.price = Number(((product.popularityScore + 1) * product.weight * goldPricePerGramUSD).toFixed(2));
    });
    return productsData;
};

async function getGoldPricePerGramUSDAsync(): Promise<number> {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
        headers: {
            'x-access-token': process.env.GOLDAPI_API_KEY,
            'Content-Type': 'application/json',
        },
    });
    return response.data.price_gram_24k;
};

export default {
    readAll,
    readAllByFilter,
};
