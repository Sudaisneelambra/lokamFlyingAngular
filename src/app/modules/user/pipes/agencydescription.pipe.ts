import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'agencydescription'
})

export class agencydescription implements PipeTransform {
    transform(value: string): string {
                  return value.length>150 ? `${value.substring(0,150)}...` :value
     }	
   }	