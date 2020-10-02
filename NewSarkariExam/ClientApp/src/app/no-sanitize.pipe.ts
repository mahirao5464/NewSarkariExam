import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noSanitize'
})
export class NoSanitizePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
