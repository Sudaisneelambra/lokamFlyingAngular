import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'agencyabout'
})

export class agencyabout implements PipeTransform {
    transform(value: string): string {
                  return value.length>25 ? `${value.substring(0,25)}...` :value
     }	
   }	