import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tableFilter'
})
export class TablePipe implements PipeTransform {

  transform(value: any, args?: any): any {

    if (!args) {
      return value;
    }
    return value.filter((val) => {
      let rVal = (val.Country.toLowerCase().includes(args)) || (val.Country.toLowerCase().includes(args));
      return rVal;
    })

  }

}