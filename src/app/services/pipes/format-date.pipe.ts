import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
})
export class FormatDatePipe implements PipeTransform {

  transform(value: any): string  {
    if (typeof value !== 'string') {
      return 'Invalid Date';
    }

    const dateElements = value.split('-');

    if (dateElements.length !== 3) {
      return 'Invalid Date Format';
    }

    const year = dateElements[0];
    const month = dateElements[1];
    const day = dateElements[2];

    return `${day}/${month}/${year}`;
  }

}
