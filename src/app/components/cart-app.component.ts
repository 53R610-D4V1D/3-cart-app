import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { CardModalComponent } from './card-modal/card-modal.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogoComponent,CardModalComponent ,NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  products: Product[] = [];
  items: CartItem[] = [];
  // total: number = 0;
  showCart: boolean = false;

  constructor(private service: ProductService) {}

  ngOnInit(): void {
    this.products = this.service.finAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    // this.calculateTotal();
  }

  onAddCart(product: Product) {
    const hasItem = this.items.find((item) => item.product.id === product.id);

    if (hasItem) {
      this.items = this.items.map((item) => {
        if (item.product.id === product.id) {
          item.quantity++;
        }
        return item;
      });
    } else {
      this.items = [...this.items, { product: { ...product }, quantity: 1 }];
    }

    // this.calculateTotal();
    // this.saveSession();
  }

  onDeleteCart(id: Number): void {
    this.items = this.items.filter((item) => item.product.id !== id);
    if (this.items.length == 0) {
      sessionStorage.removeItem('cart');
      this.showCart = false;
    }
    // this.calculateTotal();
    // this.saveSession();
  }

  // calculateTotal(): void {
  //   this.total = this.items.reduce(
  //     (acc, item) => acc + item.product.price * item.quantity,
  //     0
  //   );
  // }

  // saveSession(): void {
  //   sessionStorage.setItem('cart', JSON.stringify(this.items));
  // }

  opernCart(): void {
    this.showCart = !this.showCart;
  }
}
