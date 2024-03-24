import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    value = value.trim();
    if (!value || value.length !== 8) {
      return value;
    }
    
    const year = value.substring(0, 4);

    return year;
  }
}
