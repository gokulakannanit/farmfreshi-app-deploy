import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText: string, key: string = null): any[] {
    if (!items) return [];
    if (!searchText) return items;

    return items.filter((item) => {
      const searchObj = key ? item[key] : item;
      return Object.keys(searchObj).some((key) => {
        return String(item[key])
          .toLowerCase()
          .includes(searchText.toLowerCase());
      });
    });
  }
}
