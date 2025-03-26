import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/cartItem';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {

  @Input() items: CartItem[] = [];

  @Output() opencartEventEmitter = new EventEmitter();

  opernCart() {
    this.opencartEventEmitter.emit();
  }

}
