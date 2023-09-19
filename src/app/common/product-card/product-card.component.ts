import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent implements OnInit {
  @Input() product: IProduct;
  @Input() listMode: boolean = false;
  @Input('model') model: string = '';
  constructor() {}

  ngOnInit(): void {}

  getOffer(product: IProduct) {
    const discount = 100 - (product.price / product.mrp) * 100;
    return discount;
  }
}
