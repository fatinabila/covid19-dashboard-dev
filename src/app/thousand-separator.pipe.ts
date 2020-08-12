import { Pipe, PipeTransform }     from '@angular/core';

@Pipe({name: 'separator'})

export class Separator implements PipeTransform {
  
  constructor() {

  }

  transform(value: string): string {

    if(value == undefined)
    {
        return '';
    }
    let n = parseInt(value);

    const rx =  /(\d+)(\d{3})/;
    return String(n).replace(/^\d+/, function (w) {
        var res = w;
        while (rx.test(res)) {
            res = res.replace(rx, '$1٬$2');
        }
        return res;
    });

  }
}