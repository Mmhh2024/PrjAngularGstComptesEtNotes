import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'todoState'
})
export class TodoStatePipe implements PipeTransform {

  transform(value?: boolean, param1?: string ): string {
    if(param1 == "string") {
      if(value == true) {
        return "Terminé";
      } else {
        return "Non terminé";
      }
    } else {
      if(value == true) {
        return "hsl(153 48% 49%)";
      } else {
        return "hsl(341 79% 53%)";
      }
    }

  }

}
