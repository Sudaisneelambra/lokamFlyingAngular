import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'guidediscription'
})

export class guideDiscriptionPipe implements PipeTransform {
    transform(value: string): string {
                  return value.length>120 ? `${value.substring(0,120)}...` :value
     }	
   }	