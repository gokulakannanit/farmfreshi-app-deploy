import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService, IProduct } from 'src/app/service/product.service';
import { Router } from '@angular/router';
import { Util } from 'src/app/utils/util';
import { CommonService } from 'src/app/service/common.service';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public bannerItems: any[];

  public category: any[] = [];
  public productList: any[] = [];
  public products: IProduct[];
  public productByVarients: any[];
  public carouselProducts: IProduct[];
  public isLoadingVarients: boolean = false;
  constructor(
    private _product: ProductService,
    private _router: Router,
    private _common: CommonService
  ) {}

  ngOnInit(): void {
    const cityData = this._common.cityData;
    if (cityData) this.fillCityData(cityData);

    this._common.$afterCityCtrlLoaded
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) return false;
        this.fillCityData(data);
      });

    this._product
      .getAll()
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        this.products = data;
        this.productList = Util.combineArray(data, ['typeId']);
        this.changeVarient(0);
      });
  }

  ngOnDestroy(): void {}

  fillCityData(cityData): void {
    this.productByVarients = cityData.productVarients;
    this.bannerItems = cityData.banner;
    this.category = cityData.categories;
    this.changeVarient(0);
  }

  onRoute(link: string): void {
    this._router.navigateByUrl(link);
  }

  changeVarient(e): void {
    if (!this.productByVarients || !this.products) return;
    const productsByCat = this.productByVarients[+e].products;
    this.carouselProducts = Util.combineArray(
      Util.getProductsById(this.products, productsByCat),
      ['typeId']
    );
    this.isLoadingVarients = true;
    setTimeout(() => (this.isLoadingVarients = false), 300);
  }
}
