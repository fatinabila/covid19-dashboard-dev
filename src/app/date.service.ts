import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  getFormattedDate(date){

    let dd = this.leadingZero(date.getDate())
    let mm = this.leadingZero(date.getMonth()+1)
    let yyyy = date.getFullYear()

    return yyyy+"-"+mm+"-"+dd
  }

  leadingZero(num) {
    
    if(num <10){ num = "0"+num }

    return num
  }

  getMonth(date){

    let temp = new Date(date)

    let month = new Array(12);

    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "Mar";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "Jun";
    month[6] = "Jul";
    month[7] = "Aug";
    month[8] = "Sep";
    month[9] = "Oct";
    month[10] = "Nov"
    month[11] = "Dec"


    return  this.leadingZero(temp.getDate())+" "+month[temp.getMonth()]+" "+ temp.getFullYear()


  }
}

