import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';

// NGRX
import { Store, select } from '@ngrx/store';
import { AppState } from '../../../core/reducers';

import { Subscription } from 'rxjs';

import { Base } from '../../../core/auth/_models/bases.model';
import { ActivatedRoute } from '@angular/router';
// Services and Models
import {
  User,
  currentUserBases,
  selectUserById,
} from '../../../core/auth';



@Component({
  selector: 'kt-custom-page3',
  templateUrl: './custom-page3.component.html',
  styleUrls: ['./custom-page3.component.scss']
})
export class CustomPage3Component implements OnInit , AfterViewChecked{
  user: User

  allBases: Base[] = [];

  permisos = [
    [],
    [],
    []
  ];

  // Private properties
	private subscriptions: Subscription[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private toolbarService:ToolbarService,
               private store: Store<AppState>,) { }

  ngOnInit(): void {
    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
				this.store.pipe(select(selectUserById(id))).subscribe(res => {
					if (res) {
            debugger;
						this.user = res;
					}
				});
		});
		this.subscriptions.push(routeSubscription);

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

  addPermition(data){
    console.log(data.baseId);
    this.permisos[2].push(data.baseId);
  }

}
