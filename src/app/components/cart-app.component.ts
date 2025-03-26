import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharingDataService } from '../services/sharing-data.service';

import Swal from 'sweetalert2'


@Component({
  selector: 'cart-app',
  imports: [RouterOutlet,CatalogoComponent ,NavbarComponent],
  templateUrl: './cart-app.component.html',
})
export class CartAppComponent implements OnInit {
  items: CartItem[] = [];
  total: number = 0;

  constructor(
    private router: Router,
    private sharingDataService:SharingDataService,
    private service: ProductService) {}

  ngOnInit(): void {
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.calculateTotal();
    this.onDeleteCart();
    this.onAddCart();
  }

  onAddCart() {
    this.sharingDataService.productEventEmitter.subscribe(product => {

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
  
      this.calculateTotal();
      this.saveSession();
      this.router.navigate(['/cart'], {state:{items:this.items, total:this.total}});

      Swal.fire({
        title: "Corro de compras",
        text: "nuevo producto agregado al carrito",
        icon: "success",
      });

    });
  }

  onDeleteCart(): void {
    this.sharingDataService.idProductEventEmitter.subscribe((id: number) => {
      Swal.fire({
        title: "Estas seguro?",
        text: "No podras revertir esta accion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, borrar!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.items = this.items.filter((item) => item.product.id !== id);
          if (this.items.length == 0) {
            sessionStorage.removeItem('cart');
          }
          this.calculateTotal();
          this.saveSession();

          this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.router.navigate(['/cart'], {state:{items:this.items, total:this.total}});
          });
          Swal.fire({
            title: "Borrado!",
            text: "Tu producto ha sido eliminado.",
            icon: "success",
          });
        }
      });
    });
  }

  calculateTotal(): void {
    this.total = this.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  saveSession(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.items));
  }

}
