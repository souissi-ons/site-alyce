export interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  category: string;
  averageRating: number;
  reviewsNumber: number;
  isActive: boolean;
  proprieties?: string;
  usageAdvice?: string;
  ingredients?: string[];
  storageConditions?: string;
  precautions?: string;
}
