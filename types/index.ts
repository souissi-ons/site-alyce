export interface Review {
  _id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInfo {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  category: string;
  averageRating: number;
  reviewsNumber: number;
  purchasesNumber: number;
  isActive: boolean;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  product: ProductInfo;
  reviews: Review[];
}
