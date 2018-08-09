import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class SharedService {
  fillDriverForm = new Subject<any>();
  clicledButton = new Subject<any>();
  constructor() { }
  clicledButtonTransfer(data) {
    this.clicledButton.next(data);
  }
}
