import { Injectable } from '@angular/core';
import { products } from '../data/product.data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  finAll() {
    return products;
  }
}
