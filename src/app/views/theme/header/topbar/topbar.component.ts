// Angular
import { Component,OnInit } from '@angular/core';
import {LayoutConfigService} from '../../../../core/_base/layout';
import { currentUserBases} from '../../../../core/auth';

// RxJS
import { Observable } from 'rxjs';

// NGRX
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Base } from '../../../../core/auth/_models/bases.model';

@Component({
  selector: 'kt-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  searchDisplay = true;
  notificationsDisplay = true;
  quickActionsDisplay = true;
  cartDisplay = true;
  quickPanelDisplay = true;
  languagesDisplay = true;
  userDisplay = true;
  userLayout = 'offcanvas';
  userDropdownStyle = 'light';

  bases$: Observable<Base[]>;
  // basesUser = [];

  constructor(private layoutConfigService: LayoutConfigService,
              private store: Store<AppState>) {
    this.searchDisplay = this.layoutConfigService.getConfig('extras.search.display');
    this.notificationsDisplay = this.layoutConfigService.getConfig('extras.notifications.display');
    this.quickActionsDisplay = this.layoutConfigService.getConfig('extras.quick-actions.display');
    this.cartDisplay = this.layoutConfigService.getConfig('extras.cart.display');
    this.quickPanelDisplay = this.layoutConfigService.getConfig('extras.quick-panel.display');
    this.languagesDisplay = this.layoutConfigService.getConfig('extras.languages.display');
    this.userDisplay = this.layoutConfigService.getConfig('extras.user.display');
    this.userLayout = this.layoutConfigService.getConfig('extras.user.layout');
    this.userDropdownStyle = this.layoutConfigService.getConfig('extras.user.dropdown.style');
  }

  ngOnInit(): void {
    this.bases$ = this.store.pipe(select(currentUserBases));
    // this.bases$.subscribe((bases: Base[])=>{
    //   console.log(bases);
    //   this.basesUser = bases;
    // });
  }

  selectbase(event){
    console.log(event);
  }
}
