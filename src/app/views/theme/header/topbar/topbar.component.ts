// Angular
import { Component,OnInit } from '@angular/core';
import {LayoutConfigService} from '../../../../core/_base/layout';
import { currentUserBases, selectBaseById} from '../../../../core/auth';

// RxJS
import { Observable, Subscription } from 'rxjs';

// NGRX
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Base } from '../../../../core/auth/_models/bases.model';
import { SelectBase } from '../../../../core/auth/_actions/auth.actions';

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
  base: Base;
  // basesUser = [];

  private subscriptions: Subscription[] = [];


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
    debugger;
    console.log(event.value);
    const baseSele = this.store.pipe(select(selectBaseById(event.value))).subscribe(res => this.base = res);
    this.subscriptions.push(baseSele);
    console.log(this.base.name);
    // this.store.dispatch(new SelectBase({baseId: event.value}))
  }
}
