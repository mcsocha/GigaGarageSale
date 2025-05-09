export interface IProduct {
    /**
     * Unique identifier for the product.
      */
    id: number;

    /**
     * Title of the product.
     */
    title: string;

    /**
     * Brand/manufacturer of the product.
     */
    brand: string;

    /**
     * Full product name.
     */
    name: string

    /**
     * Price of the product.
     */
    price: number;

    /**
     * Image URL of the product.
     */
    imageUrl: string;

    /**
     * Category of the product.
     */
    category: string;

    /**
     * List of description for the product.
     */
    descriptions: string[];

    /**
     * Average rating of the product. 1-5
     */
    rating: number;

    /**
     * Number of reviews for the product.
     */
    numReviews: number;

    /**
     * Business or person marketing the product with GigaGarageSale.
     */
    merchant: string;

    /**
     * Number of products available for sale.
     */
    available: number;
}