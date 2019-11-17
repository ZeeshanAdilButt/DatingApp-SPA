import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})

export class AlertifyService {

  constructor() { }

  public confirm(message: string, okCallback: () => any) {

    alertify.confirm(message, function (e) {
      if (e) {
        okCallback();
      } else {

      }
    });
  }

  public success(message: string) {
    alertify.success(message);
  }

  public error(message: string) {
    alertify.error(message);
  }

  public warning(message: string) {
    alertify.warning(message);
  }

  public message(message: string) {
    alertify.message(message);
  }

}
