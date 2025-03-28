
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from '../product-card/product-card.component';
import { SharingDataService } from '../../services/sharing-data.service';
import { Store } from '@ngrx/store';
import { load } from '../../store/products.actions';

@Component({
  selector: 'catalogo',
  imports: [ProductCardComponent],
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  products!: Product[];

  constructor(
    private store: Store<{products: any }>,
    private sharingDateService: SharingDataService,
    
  ) {
     this.store.select('products').subscribe(state => this.products = state.products)
  }

  ngOnInit(): void {
    this.store.dispatch(load())
  }

  onAddCart(product: Product) {
    this.sharingDateService.productEventEmitter.emit(product);
  }
}
