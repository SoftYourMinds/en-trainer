import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emailEdit'
})
export class EmailEditPipe implements PipeTransform {

  transform(value: string): string {
    const atIndex = value.indexOf('@');
    if(atIndex != -1){
      return value.substring(0, atIndex)
    }
    return value; 
  }

}
