import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usernameMask',
})
export class UsernameMaskPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    if (!value) return value;
    let toBeReplaced = value.slice(1, 7);
    return value.replace(toBeReplaced, ' - xxx - ');
  }
}
