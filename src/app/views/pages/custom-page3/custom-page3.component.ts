import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';

// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../core/reducers';

import { Subscription } from 'rxjs';

import { Base } from '../../../core/auth/_models/bases.model';
// Services and Models
import {
	currentUserBases
} from '../../../core/auth';



@Component({
  selector: 'kt-custom-page3',
  templateUrl: './custom-page3.component.html',
  styleUrls: ['./custom-page3.component.scss']
})
export class CustomPage3Component implements OnInit , AfterViewChecked{

  allBases: Base[] = [];

  permisos = [
    [],
    [],
    []
  ];

  // Private properties
	private subscriptions: Subscription[] = [];

  constructor(private toolbarService:ToolbarService,
              private store: Store<AppState>,) { }

  ngOnInit(): void {
    const basesSubscription = this.store.pipe(select(currentUserBases)).subscribe(res => this.allBases = res);
		this.subscriptions.push(basesSubscription);
  }

  ngAfterViewChecked() {
    this.toolbarService.emit(
      {
        parent:{name:'Community info', url:'/community'},
        children : [
          {name:'Alta de Usuarios', url: '/page2'},
          {name:'Permisos',url:'/page3' }
        ]
      });
  }

  addPermition(base){
    console.log(base.baseId);
    this.permisos[2].push(base.baseId);
  }

}
