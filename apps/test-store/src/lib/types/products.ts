export interface ProductRequest {
  category?: string;
  limit?: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductCart extends Product {
  quantity: number;
}

export interface Category {
  name: string;
}
