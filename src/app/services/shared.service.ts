import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedService {
  fillDriverForm = new Subject<any>();
  constructor() { }
//   transferDataDriverForm(data) {
//     console.log(data);
//     this.fillDriverForm.next(data);
//     console.log(this.fillDriverForm);
//   }
}
