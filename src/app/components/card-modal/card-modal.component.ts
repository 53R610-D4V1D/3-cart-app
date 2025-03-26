import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'card-modal',
  imports: [CartComponent],
  templateUrl: './card-modal.component.html',
})
export class CardModalComponent {
  @Input() items: CartItem[] = [];
  // @Input() total: number = 0;

  @Output() idProductEventEmitter = new EventEmitter();
  @Output() opencartEventEmitter = new EventEmitter();

  opernCart() {
    this.opencartEventEmitter.emit();
  }

  onDeleteCart(id: Number) {
    this.idProductEventEmitter.emit(id);
  }
}
