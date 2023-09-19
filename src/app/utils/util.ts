import { OnDestroy, ElementRef } from '@angular/core';
import { Subject, MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICart } from '../service/cart.service';
import { environment } from 'src/environments/environment';

export class Util {
  static isExist(obj: any[], key: string): boolean {
    if (!obj || obj === undefined) return false;
    if (!obj[key]) return false;
    return true;
  }

  static getValueById(arr: any[], filterBy: any): any[] {
    if (!arr) return null;
    const column = filterBy['column'];
    return arr.filter((item) => item[column] === filterBy['value'])[0];
  }

  static getRect(ele) {
    return ele.nativeElement
      ? ele.nativeElement.getBoundingClientRect()
      : ele.getBoundingClientRect();
  }

  static clickDocument() {
    document.body.click();
  }

  static getProductsById(products, filterProducts) {
    const filterArray = filterProducts.split(',');
    return filterArray.map((filterId) => {
      return products.filter((product) => +product.id === +filterId)[0];
    });
  }

  static sortData(data: any[]) {
    return data.sort((a, b) => {
      return <any>new Date(b.createdAt) - <any>new Date(a.createdAt);
    });
  }

  static focusFirstInput(_eleRef) {
    setTimeout(() => {
      const ele = Util.getInput(_eleRef);
      if (ele && ele[0]) ele[0].focus();
    }, 10);
  }

  static getTotalCartPrice(Obj: Array<ICart>): number {
    if (!Obj) return 0;
    return Obj.reduce((prevVal: any, currVal: any) => {
      return prevVal + currVal.count * currVal.product.price;
    }, 0);
  }

  static getInput(ele: ElementRef) {
    return ele.nativeElement.querySelectorAll('input');
  }

  static getNode(CatObj: any[], value: number) {
    let isExist = false;
    //console.clear();
    //console.log('Before', CatObj);
    const checkVal = (Obj, nxt: boolean = false) => {
      let filteredArray = [];
      //console.log(level, ' ---> clear filter: ', filteredArray);
      Obj.some((ele) => {
        if (isExist) return true;
        if (!nxt) filteredArray = [];
        filteredArray.pop();
        //console.log('check', ele);
        //console.log(ele.id, ' : ', value);
        if (ele.id === +value) {
          isExist = true;
          filteredArray.push(ele);
          return true;
        }
        if (ele.subCategory && !isExist) {
          filteredArray.push(ele);
          const newArr = checkVal(ele.subCategory, true);
          if (newArr.length) {
            newArr.map((newObj) => {
              filteredArray.push(newObj);
            });
          }
        }
        return false;
      });
      return filteredArray;
    };
    const filteredArray = checkVal(CatObj);
    filteredArray.reduce((acc, val) => acc.concat(val), []);
    //console.log(filteredArray);
    return filteredArray;
  }

  static time: number;

  static get API_URL(): string {
    let domain = window.location.hostname;
    if (domain !== 'localhost' && domain !== '192.168.1.9') {
      domain = environment.API_URL
        ? environment.API_URL
        : 'https://api.farmfreshi.com/';
    } else {
      domain = '/api/';
    }
    return domain;
  }

  static tick(message) {
    Util.time = new Date().getTime();
  }

  static getSelectedItem(types, id) {
    return types.filter((item) => item.id === id)[0];
  }

  static stopTick(message) {
    console.log(message, (new Date().getTime() - Util.time) / 1000);
  }

  static combineArray(array: any[], keyValues: any[] | string): any[] {
    return array.reduce((typeArr, oldArr) => {
      var isExist = false;
      typeArr = typeArr.map((item) => {
        if (item.key === Util.addAllKeyValues(oldArr, keyValues)) {
          isExist = true;
          item.options.push(oldArr);
        }
        return item;
      });
      if (!isExist && oldArr) {
        typeArr.push({
          key: Util.addAllKeyValues(oldArr, keyValues),
          options: [oldArr],
          selected: oldArr,
        });
      }
      return typeArr;
    }, []);
  }

  static addAllKeyValues(array: any[], keyValues): string {
    return keyValues.reduce((o, n) => {
      return o + array[n];
    }, '');
  }

  static takeUntil<T>(
    component: OnDestroy,
    destroyed$: Subject<any> = new Subject()
  ): MonoTypeOperatorFunction<T> {
    const { ngOnDestroy } = component;
    component.ngOnDestroy = () => {
      ngOnDestroy.apply(component);
      destroyed$.next();
      destroyed$.complete();
    };
    return takeUntil(destroyed$);
  }
}
