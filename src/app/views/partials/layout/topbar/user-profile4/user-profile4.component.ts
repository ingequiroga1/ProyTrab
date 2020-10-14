// Angular
import { Component, Input, OnInit } from '@angular/core';
// RxJS
import { Observable } from 'rxjs';
// NGRX
import { select, Store } from '@ngrx/store';
// State
import { AppState } from '../../../../../core/reducers';
import { currentUser,Logout} from '../../../../../core/auth';
import { CustomerModel } from '../../../../../core/e-commerce/_models/customer.model';

@Component({
  selector: 'kt-user-profile4',
  templateUrl: './user-profile4.component.html',
})
export class UserProfile4Component implements OnInit {
  // Public properties
  customer$: Observable<CustomerModel>;
  // bases$: Observable<Base[]>;

  @Input() avatar = true;
  @Input() greeting = true;
  @Input() badge: boolean;
  @Input() icon: boolean;

  /**
   * Component constructor
   *
   * @param store: Store<AppState>
   */
  constructor(private store: Store<AppState>) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    debugger;
    this.customer$ = this.store.pipe(select(currentUser));
    // this.bases$ = this.store.pipe(select(currentUserBases));
  }

  /**
   * Log out
   */
  logout() {
    this.store.dispatch(new Logout());
  }
}
