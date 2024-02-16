import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'placename'
})

export class PlacePipe implements PipeTransform {
    transform(value: string): string {
                  return value.length>13? `${value.substring(0,13)}...` :value
     }	
   }	
   