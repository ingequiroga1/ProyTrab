import { AfterViewChecked,Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from '../../../core/_base/layout/services/subheader.service';
import { LayoutUtilsService, MessageType } from '../../../core/_base/crud/utils/layout-utils.service';
import { Store,select } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { LayoutConfigService } from 'src/app/core/_base/layout';
import { Update } from '@ngrx/entity';
import { ToolbarService } from '../../services/toolbar.service';

// Services and Models
import {
	User,
	UserUpdated,
	Address,
	SocialNetworks,
	selectHasUsersInStore,
	selectUserById,
	UserOnServerCreated,
	selectLastCreatedUserId,
	selectUsersActionLoading
} from '../../../core/auth';


@Component({
  selector: 'kt-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, AfterViewChecked, OnDestroy {
  // Public properties
	user: User;
	userId$: Observable<number>;
	oldUser: User;
	selectedTab = 0;
  loading$: Observable<boolean>;
  
  userForm: FormGroup;
  hasFormErrors = false;

  private subscriptions: Subscription[] = [];

  constructor(private toolbarService: ToolbarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userFB: FormBuilder,
    private subheaderService: SubheaderService,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,
    private layoutConfigService: LayoutConfigService
    ) { }

  ngOnInit() {
    this.loading$ = this.store.pipe(select(selectUsersActionLoading));

    const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectUserById(id))).subscribe(res => {
					if (res) {
						this.user = res;
						this.oldUser = Object.assign({}, this.user);
						this.initUser();
					}
				});
			} else {
				this.user = new User();
				this.user.clear();
				this.oldUser = Object.assign({}, this.user);
				this.initUser();
			}
    });
    this.subscriptions.push(routeSubscription);
  }

  initUser() {
		this.createForm();
		if (!this.user.userId) {
			this.subheaderService.setTitle('Create user');
			this.subheaderService.setBreadcrumbs([
				{ title: 'User Management', page: `user-management` },
				{ title: 'Users',  page: `user-management/users` },
				{ title: 'Create user', page: `user-management/users/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit user');
		this.subheaderService.setBreadcrumbs([
			{ title: 'User Management', page: `user-management` },
			{ title: 'Users',  page: `user-management/users` },
			{ title: 'Edit user', page: `user-management/users/edit`, queryParams: { id: this.user.userId } }
		]);
  }
  
  createForm() {
		this.userForm = this.userFB.group({
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
  refreshUser(isNew: boolean = false, id = 0) {
	  debugger;
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/page2/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Reset
	 */
	reset() {
		this.user = Object.assign({}, this.oldUser);
		this.createForm();
		this.hasFormErrors = false;
		this.userForm.markAsPristine();
  this.userForm.markAsUntouched();
  this.userForm.updateValueAndValidity();
	}
  
  onSumbit(withBack: boolean = false) {
		this.hasFormErrors = false;
		const controls = this.userForm.controls;
		/** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedUser = this.prepareUser();

		if (editedUser.userId > 0) {
			this.updateUser(editedUser, withBack);
			return;
		}

		this.addUser(editedUser, withBack);
  }

  goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}
  
  prepareUser(): User {
		const controls = this.userForm.controls;
		const _user = new User();
		_user.clear();
		_user.accessToken = this.user.accessToken;
		_user.refreshToken = this.user.refreshToken;
		_user.pic = this.user.pic;
		_user.userId = this.user.userId;
		_user.userTypeId = 'Mover';
		_user.password = 'string';
		_user.statusId = 'Activo';
		_user.username = controls.userName.value;
		_user.userSurname = controls.userSurname.value;
		_user.userLastname = controls.userLastname.value;
		_user.userPosition = controls.userRole.value;
		_user.userArea = controls.userArea.value;
		_user.userMobile = +controls.userMobile.value;
		//_user.userMobile = 5421546546;
		_user.expirationDate = '2020-12-12';
		_user.bloodtype = controls.bloodtype.value;
		_user.stationId = 1;
		_user.alergiesCondition = controls.alergiesCondition.value;
		_user.email = controls.email.value;
		_user.street = controls.street.value;
		_user.interiorNumber = controls.interiorNumber.value;
		_user.exteriorNumber = controls.exteriorNumber.value;
		_user.zipCode = controls.zipCode.value;
		_user.neighborhood = controls.neighborhood.value;
		_user.state = controls.state.value;
		_user.city = controls.city.value;
		_user.contactName = controls.contactName.value;
		_user.contactSurname = controls.contactSurname.value;
  		_user.contactLastname = controls.contactLastname.value;
  		_user.contactPhone = +controls.contactPhone.value;
		_user.fullname = controls.userSurname.value;
		_user.occupation = controls.userLastname.value;
		_user.phone = controls.userMobile.value;
		_user.companyName = controls.stationId.value;
		_user.RelativeId= 'Padre'
		return _user;
  }
  
  addUser(_user: User, withBack: boolean = false) {
		let response = this.store.dispatch(new UserOnServerCreated({ user: _user }));

		debugger;
		this.store.subscribe( state => {console.log(state);
		});
		

		const addSubscription = this.store.pipe(select(selectLastCreatedUserId)).subscribe(newId => {
			const message = `New user successfully has been added.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, true);
			debugger;
			if (newId) {
				if (withBack) {
					this.goBackWithId();
				} else {
					this.refreshUser(true, newId);
				}
			}
		});
		this.subscriptions.push(addSubscription);
  }
  
  updateUser(_user: User, withBack: boolean = false) {
		// Update User
		// tslint:disable-next-line:prefer-const

		const updatedUser: Update<User> = {
			id: _user.userId,
			changes: _user
		};
		this.store.dispatch(new UserUpdated( { partialUser: updatedUser, user: _user }));
		const message = `User successfully has been saved.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
		if (withBack) {
			this.goBackWithId();
		} else {
			this.refreshUser(false);
		}
  }
  
  getComponentTitle() {
		let result = 'Create user';
		if (!this.user || !this.user.userId) {
			return result;
		}

		result = `Edit user - ${this.user.fullname}`;
		return result;
  }

  ngAfterViewChecked() {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/community'},
    children:[ {name: this.getComponentTitle(), url:'/page1'}]});
  }



	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

  ngOnDestroy(){

  }
}
