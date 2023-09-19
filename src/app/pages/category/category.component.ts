import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, IProduct } from 'src/app/service/product.service';
import { Util } from 'src/app/utils/util';
import { FilterPipe } from 'src/app/common/pipe/filter.pipe';
import { CommonService } from 'src/app/service/common.service';

@Component({
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  public selectedCategory: any;
  public isLoading: boolean = true;
  public listMode: boolean;
  public productList: any[] = [];
  public searchText: string = '';
  public products: IProduct[];
  public errorMsg: string;
  constructor(
    private _productService: ProductService,
    private _route: ActivatedRoute,
    private _filter: FilterPipe,
    private _common: CommonService
  ) {}

  ngOnInit(): void {
    const { id } = this._route.snapshot.params;

    this._route.params.pipe(Util.takeUntil(this)).subscribe((params) => {
      const { id } = params;
      this._selectCategory(id);
    });

    this._selectCategory(id);
  }

  ngOnDestroy(): void {}

  private _selectCategory(id) {
    if (!this._common.cityData) return false;
    this.selectedCategory = this._common.cityData.categories.filter((item) => {
      return item.id === +id;
    })[0];

    if (this.selectedCategory.active) {
      this._getProducts(id);
    } else {
      this.isLoading = false;
      this.products = [];
    }
  }

  private _getProducts(id) {
    this.isLoading = true;
    this.errorMsg = null;

    this._productService
      .getProductsByCategory(+id)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          this.isLoading = false;
          this.products = Object.assign([], data);
          this.doFilter();
        },
        (error) => {
          this.isLoading = false;
          this.products = [];
          this.errorMsg =
            'No Records Found. We are trying to fix this soon try once again.';
        }
      );
  }

  doFilter(): void {
    this.productList = Util.combineArray(
      this._filter.transform(this.products, this.searchText),
      ['typeId']
    );
  }
}
