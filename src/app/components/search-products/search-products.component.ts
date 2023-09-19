import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { PopoverComponent } from 'src/app/common/popover/popover.component';
import { Util } from 'src/app/utils/util';
import { ProductService, IProduct } from 'src/app/service/product.service';

@Component({
  selector: 'search-product',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css'],
})
export class SearchProductsComponent implements OnInit, OnDestroy {
  @ViewChild('searchPopover') searchPopover: PopoverComponent;
  @ViewChild('searchTxt') searchTxt: ElementRef;
  @ViewChild('searchTxtOuter') searchTxtOuter: ElementRef;

  public products: Partial<IProduct>[];
  public searchVal: string;
  constructor(private _productService: ProductService) {}

  ngOnInit(): void {
    this._productService
      .getAll()
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        this.products = data;
      });
  }

  ngOnDestroy() {}

  openSearchPopover(event: FocusEvent): void {
    this.searchPopover
      .open(event.target)
      .pipe(Util.takeUntil(this))
      .subscribe(() => {
        this.searchTxtOuter.nativeElement.focus();
      });
    this.searchTxt.nativeElement.focus();
  }
}
