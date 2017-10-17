import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class UserService {
  // Observable string sources
  private user = new Subject<string>();
  private userAdd = new Subject<string>();

  // Observable string streams
  // UserStream = this.user.asObservable();
  // UserAddStream = this.userAdd.asObservable();

  constructor() { }

  addUserData(userData: any) {
    this.userAdd.next(userData);
  }

  getUserData(): Observable<any> {
    return this.user.asObservable();
  }
}
