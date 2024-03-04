import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'aboutpackage'
})

export class aboutpackage implements PipeTransform {
    transform(value: string): string {
                  return value.length>200 ? `${value.substring(0,200)}...` :value
     }	
   }	