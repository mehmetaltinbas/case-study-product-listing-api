import axios from 'axios';
import productsData from '../data/products.json';
// import productsData from '../data/mock-products.json';
import { Product } from '../types/product.interface';
import { ReadAllProductsResponse } from '../types/response/read-all-products.responses';
import { ProductFilterStrategyComposite } from '../strategies/product-filter/product-filter.strategy.composite';
import { ReadAllProductsByFilterDto } from '../types/dto/read-all-products-by-filter.dto';

async function readAll(): Promise<ReadAllProductsResponse> {
    const products = await getProductsAsync();
    const productsWithStarValues = constructStarValues(products);
    return { isSuccess: true, message: 'All products read!', products: productsWithStarValues };
}

async function readAllByFilter(
    readAllProductsByFilterDto: ReadAllProductsByFilterDto
): Promise<ReadAllProductsResponse> {
    const products = await getProductsAsync();
    const productsWithStarValues = constructStarValues(products);
    const productFilterStrategyComposite = new ProductFilterStrategyComposite();
    const filteredProducts = productFilterStrategyComposite.filter(
        productsWithStarValues,
        readAllProductsByFilterDto
    );

    return {
        isSuccess: true,
        message: 'all products read by given filters',
        products: filteredProducts,
    };
}

function constructStarValues(products: Product[]): Product[] {
    for (const product of products) {
        product.starValues = [];
        const score = product.popularityScore * 5;
        const floorOfScore = Math.floor(score);
        const remainder = score - floorOfScore;
        for (let i = 1; i <= floorOfScore; i++) {
            product.starValues.push(1);
        }
        product.starValues.push(remainder);
        const remaining = 5 - product.starValues.length;
        if (remaining >= 1) {
            for (let i = 1; i <= remaining; i++) {
                product.starValues.push(0);
            }
        }
    }
    return products;
}

async function getProductsAsync(): Promise<Product[]> {
    const goldPricePerGramUSD = await getGoldPricePerGramUSDAsync();
    productsData.forEach((product: Product) => {
        product.price = Number(
            ((product.popularityScore + 1) * product.weight * goldPricePerGramUSD).toFixed(2)
        );
    });
    return productsData;
}

async function getGoldPricePerGramUSDAsync(): Promise<number> {
    const response = await axios.get('https://www.goldapi.io/api/XAU/USD', {
        headers: {
            'x-access-token': process.env.GOLDAPI_API_KEY,
            'Content-Type': 'application/json',
        },
    });
    return response.data.price_gram_24k;
}

export default {
    readAll,
    readAllByFilter,
};
