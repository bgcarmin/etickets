import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  reqNumber = 0;

  constructor(private ngxSpinner: NgxSpinnerService) { }

  busy() {
    this.reqNumber++;
    this.ngxSpinner.show(undefined, {
      type: 'timer',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    });
  }

  idle() {
    this.reqNumber--;
    if(this.reqNumber <= 0) {
      this.reqNumber = 0;
      this.ngxSpinner.hide();
    }
  }
}
