export interface Product {
    id: number;
    name: string;
    popularityScore: number;
    weight: number;
    images: {
        yellow: string;
        rose: string;
        white: string;
    };
    price?: number;
}
