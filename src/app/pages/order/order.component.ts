import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService, IOrder } from 'src/app/service/order.service';
import { Util } from 'src/app/utils/util';
import { DialogService } from 'src/app/service/dialog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SUCCESS_MSG } from 'src/app/config/config';
import { ProductService } from 'src/app/service/product.service';
import { CartService } from 'src/app/service/cart.service';
import { MessageDialogComponent } from 'src/app/components/message-dialog/message-dialog.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit, OnDestroy {
  public orders: IOrder[] = [];
  public productList: any[];
  public deletingOrder: IOrder;
  public isLoading: boolean = true;
  public selectedTab: number = 0;
  constructor(
    private _cart: CartService,
    private _order: OrderService,
    private _product: ProductService,
    private _dialog: DialogService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._getOrders(0);
  }

  ngOnDestroy(): void {}

  loadOrder(e): void {
    this.selectedTab = e;
    this._getOrders(e);
  }

  getProgress(status) {
    if (!status) return 25;
    return (status + 1) * 25;
  }

  cancelOrder(order: IOrder): void {
    order.cancelling = true;
    this.deletingOrder = order;
    this._dialog
      .openCustomDialog(
        MessageDialogComponent,
        {
          info: 'Are you sure like to cancel this order ?',
        },
        { width: '280px' }
      )
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) {
          order.cancelling = false;
          return;
        }
        //confirm cancel
        this._confirmCancel(order);
      });
  }

  showOrderDetail(order: IOrder): void {
    order.expanded = !order.expanded;
    this.showProductDetail(order);
  }

  repeatOrder(order: IOrder): void {
    this.showProductDetail(order);
    this._dialog
      .openCustomDialog(
        MessageDialogComponent,
        {
          info: 'Repeating this Order will start fresh order.',
        },
        { width: '280px' }
      )
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) {
          return;
        }
        //confirm repeat
        this._cart.cartList = this.productList;
        this._cart.afterAdd$.next(this._cart.cartList);
      });
  }

  showProductDetail(order: IOrder) {
    const products = order.products.split(',');
    const counts = order.counts.split(',');
    this._product
      .getAll()
      .pipe(Util.takeUntil(this))
      .subscribe((data) => {
        if (!data) return;
        this.productList = [];
        products.map((id, index) => {
          const cart = {
            count: counts[index],
            product: data.filter((item) => +item.id === +id)[0],
          };
          this.productList.push(cart);
        });
      });
  }

  private _confirmCancel(order: IOrder) {
    this._order
      .cancelOrder(order.id)
      .pipe(Util.takeUntil(this))
      .subscribe(
        (data) => {
          order.cancelling = false;
          this._snackBar.open(SUCCESS_MSG.ORDER_CANCEL, null, {
            duration: 2000,
          });
          this.orders = this.orders.filter((item) => item.id !== order.id);
        },
        (error) => {
          order.error = 'Sorry, Order not cancelled, please try later.';
        }
      );
  }

  private _getOrders(index): void {
    this.isLoading = true;
    this._order
      .getOrder(index)
      .pipe(Util.takeUntil(this))
      .subscribe((data: IOrder[]) => {
        this.isLoading = false;
        this.orders = Util.sortData(data) ? data : [];
      });
  }
}
