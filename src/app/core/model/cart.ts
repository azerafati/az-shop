import { Product } from './product';

export interface Cart {
  id: number, // User id
  products: Product[],
}
