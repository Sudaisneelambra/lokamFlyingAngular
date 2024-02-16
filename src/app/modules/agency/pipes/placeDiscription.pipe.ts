import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'placediscription'
})

export class PlaceDiscriptionPipe implements PipeTransform {
    transform(value: string): string {
                  return value.length>50 ? `${value.substring(0,50)}...` :value
     }	
   }	
   