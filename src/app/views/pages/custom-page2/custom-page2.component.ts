import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';

// Services and Models
import { selectUserById,AuthService } from '../../../core/auth';
import { result } from 'lodash';
// RxJS
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../../core/auth/_models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'kt-custom-page2',
  templateUrl: './custom-page2.component.html',
  styleUrls: ['./custom-page2.component.scss']
})
export class CustomPage2Component implements OnInit,AfterViewChecked {

  user : User;
  userid$: Observable<number>;
  oldUser: User;
  loadingSubject = new BehaviorSubject<boolean>(true);
  userForm2: FormGroup

  constructor(
    private toolbarService:ToolbarService,
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private authService: AuthService,
    private router: Router,
    private userFB: FormBuilder ) {  }

  ngOnInit(): void {
    debugger;
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      if(id &&  id > 0){
        this.store.pipe(
          select(selectUserById(id))
      ).subscribe(resu => {
        if(!resu){
          this.loadUserFromService(id);
          return;
        }
        this.loadUser(result);
      });
      }else{
        const newUser = new User();
				newUser.clear();
				this.loadUser(newUser);
      }
  });
  }

  loadUser(_user, fromService: boolean = false){
    if(!_user){
      this.goBack('');
    }
    this.user = _user;
    this.userid$ = of(_user.userId);
    this.oldUser = Object.assign({}, _user);
    this.initUser();
  }

  	// If product didn't find in store
	loadUserFromService(userId) {
		this.authService.getUserById(userId).subscribe(res => {
			this.loadUser(res, true);
		});
  }
  goBack(id) {
		this.loadingSubject.next(false);
		const url = `users/detalle?id=${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }
  
  initUser(){
    this.createForm();
    this.loadingSubject.next(false);
  }

  createForm(){
    this.userForm2 = this.userFB.group({
      fullname: [this.user.fullname],
      userType: [this.user.userTypeId],
      stationId:[this.user.statusId],
      statusId:[this.user.statusId],
      userName:[this.user.username, Validators.compose([Validators.pattern('^[a-zA-Z ]*$'), Validators.required])],
      userSurname:[this.user.userSurname, Validators.compose([Validators.pattern('^[a-zA-Z ]*$'), Validators.required])],
      userLastname: [this.user.userLastname, Validators.compose([Validators.pattern('^[a-zA-Z ]*$'), Validators.required])],
      userBirthday:[this.user.userBirthday],
	  userMobile:[this.user.userMobile,Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(10),Validators.maxLength(10), Validators.required])],
      email:[this.user.email, Validators.compose([Validators.required, Validators.email])],
      expirationDate: [this.user.expirationDate],
      street:[this.user.street],
      exteriorNumber:[this.user.exteriorNumber],
      interiorNumber:[this.user.interiorNumber],
      zipCode: [this.user.zipCode],
      neighborhood:[this.user.street],
      state:[this.user.state],
      city:[this.user.city],
	  userArea: [this.user.userArea],
	  userRole: [this.user.userPosition],
      bloodtype:[this.user.statusId],
      alergiesCondition:[this.user.alergiesCondition],
      contactName: [this.user.contactName],
      contactSurname:[this.user.contactSurname],
      contactLastname:[this.user.contactLastname],
      contactPhone:[this.user.contactPhone,Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(10), Validators.maxLength(10), Validators.required])],

    });
  }

  ngAfterViewChecked() {
    this.toolbarService.emit({ parent:{name: 'Community info', url: '/community'}, children:[ {name:'Detalle de  Alta de Usuarios' , url: '/page2'} ]});
  }

}
