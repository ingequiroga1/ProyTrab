// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// RxJS
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
// NGRX
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { AppState } from '../../../../../core/reducers';
// Layout
import { SubheaderService, LayoutConfigService } from '../../../../../core/_base/layout';
import { LayoutUtilsService, MessageType } from '../../../../../core/_base/crud';

//Pipes
import { DatePipe } from '@angular/common'

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
} from '../../../../../core/auth';

@Component({
	selector: 'kt-user-edit',
	templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit, OnDestroy {
	// Public properties
	user: User;
	userId$: Observable<number>;
	oldUser: User;
	selectedTab = 0;
	loading$: Observable<boolean>;
	rolesSubject = new BehaviorSubject<number[]>([]);
	addressSubject = new BehaviorSubject<Address>(new Address());
	soicialNetworksSubject = new BehaviorSubject<SocialNetworks>(new SocialNetworks());
	userForm: FormGroup;
	hasFormErrors = false;
	imgpreview = '/assets/media/users/default.jpg';
	userimage: File;
	addpermitions = false;

	isMover= true; // 08/10/2020



	// Private properties
	private subscriptions: Subscription[] = [];

	/**
	 * Component constructor
	 *
	 * @param activatedRoute: ActivatedRoute
	 * @param router: Router
	 * @param userFB: FormBuilder
	 * @param subheaderService: SubheaderService
	 * @param layoutUtilsService: LayoutUtilsService
	 * @param store: Store<AppState>
	 * @param layoutConfigService: LayoutConfigService
	 */
	constructor(private activatedRoute: ActivatedRoute,
		           private router: Router,
		           private userFB: FormBuilder,
		           private subheaderService: SubheaderService,
		           private layoutUtilsService: LayoutUtilsService,
		           private store: Store<AppState>,
				   private layoutConfigService: LayoutConfigService,
				   private datepipe: DatePipe) { }

	/**
	 * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
	 */

	/**
	 * On init
	 */
	ngOnInit() {
		this.loading$ = this.store.pipe(select(selectUsersActionLoading));
		debugger;
		const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectUserById(id))).subscribe(res => {
					if (res) {
						this.user = res;
						this.rolesSubject.next(this.user.roles);
						this.addressSubject.next(this.user.address);
						this.soicialNetworksSubject.next(this.user.socialNetworks);
						this.oldUser = Object.assign({}, this.user);
						this.addpermitions = true;
						this.initUser();
					}
				});
			} else {
				this.user = new User();
				this.user.clear();
				this.rolesSubject.next(this.user.roles);
				this.addressSubject.next(this.user.address);
				this.soicialNetworksSubject.next(this.user.socialNetworks);
				this.oldUser = Object.assign({}, this.user);
				this.initUser();
			}
		});
		this.subscriptions.push(routeSubscription);
	}

	ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

	/**
	 * Init user
	 */
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

	/**
	 * Create form
	 */
	createForm() {
		this.userForm = this.userFB.group({
      userType: [this.user.userTypeId],
      stationId:[this.user.stationId],
      statusId:[this.user.statusId],
      userName:[this.user.userName, Validators.compose([
		  Validators.pattern('^[a-zA-Z ]*$'),
		  Validators.required,
		  Validators.maxLength(50)
		])],
      userSurname:[this.user.userSurname, Validators.compose([
		  Validators.pattern('^[a-zA-Z ]*$'),
		  Validators.required,
		  Validators.maxLength(50)
		])],
      userLastname: [this.user.userLastname, Validators.compose([
		  Validators.pattern('^[a-zA-Z ]*$'), 
		  Validators.required,
		  Validators.maxLength(50)
		])],
	  userRole: [this.user.userPosition,Validators.required],
	  userArea: [this.user.userArea,Validators.required],
	  userBirthday:[this.user.userBirthday],
	  userMobile:[this.user.userMobile,Validators.compose([
		  Validators.pattern('^[0-9]*$'),
			Validators.minLength(10),
			Validators.maxLength(10),
			Validators.required
		])],
      email:[this.user.email, Validators.compose([
		  Validators.required, 
		  Validators.email,
		  Validators.maxLength(50)
		])],
	  street:[this.user.street, Validators.compose([
		Validators.maxLength(50)
	  ])],
	  exteriorNumber:[this.user.exteriorNumber,Validators.compose([
		Validators.maxLength(20)
	  ])],
      interiorNumber:[this.user.interiorNumber,Validators.compose([
		Validators.maxLength(20)
	  ])],
	  zipCode: [this.user.zipCode,Validators.compose([
		Validators.pattern('^[0-9]*$'),
		Validators.maxLength(5)
	  ])],
      expirationDate: [this.user.expirationDate],
      neighborhood:[this.user.street],
      state:[this.user.state],
      city:[this.user.city],
      bloodtype:[this.user.statusId],
	  alergiesCondition:[this.user.alergiesCondition],
      contactName: [this.user.contactName,Validators.compose([
		Validators.pattern('^[a-zA-Z ]*$'),
		Validators.required,
		Validators.maxLength(50)
	  ])],
      contactSurname:[this.user.contactSurname, Validators.compose([
		Validators.pattern('^[a-zA-Z ]*$'),
		Validators.required,
		Validators.maxLength(50)
	  ])],
      contactLastname:[this.user.contactLastname, Validators.compose([
		Validators.pattern('^[a-zA-Z ]*$'),
		Validators.required,
		Validators.maxLength(50)
	  ])],
      contactPhone:[this.user.contactPhone,Validators.compose([
		  Validators.pattern('^[0-9]*$'),
			Validators.minLength(10),
			Validators.maxLength(10),
			Validators.required]
			)
		],
		});
  }

	/**
	 * Redirect to list
	 *
	 */
	goBackWithId() {
		const url = `/user-management/users`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

	/**
	 * Refresh user
	 *
	 * @param isNew: boolean
	 * @param id: number
	 */
	refreshUser(isNew: boolean = false, id = 0) {
		debugger;
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/user-management/users/edit/${id}`;
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

	/**
	 * Save data
	 *
	 * @param withBack: boolean
	 */
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

	/**
	 * Returns prepared data for save
	 */
	prepareUser(): User {
		debugger;
		const controls = this.userForm.controls;
		const _user = new User();
		_user.clear();
		_user.accessToken = this.user.accessToken;
		_user.refreshToken = this.user.refreshToken;
		_user.pic = this.user.pic;
		_user.userId = this.user.userId;
		_user.userTypeId = controls.userType.value;
		_user.password = 'string';
		_user.statusId = controls.statusId ? "Activo" : "Inactivo";
		_user.username = controls.userName.value;
		_user.userSurname = controls.userSurname.value;
		_user.userLastname = controls.userLastname.value;
		_user.userPosition = controls.userRole.value;
		_user.userArea = controls.userArea.value;
		_user.userMobile = +controls.userMobile.value;
		_user.expirationDate = this.datepipe.transform(controls.expirationDate.value, 'yyyy-MM-dd');
		 //'2020-12-12';
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

	/**
	 * Add User
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
	addUser(_user: User, withBack: boolean = false) {
		this.store.dispatch(new UserOnServerCreated({ user: _user, image: this.userimage }));
		const addSubscription = this.store.pipe(select(selectLastCreatedUserId)).subscribe(newId => {
			const message = `Nuevo Usuario Agregado.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
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

	/**
	 * Update user
	 *
	 * @param _user: User
	 * @param withBack: boolean
	 */
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

	/**
	 * Returns component title
	 */
	getComponentTitle() {
		let result = 'Create user';
		if (!this.user || !this.user.userId) {
			return result;
		}

		result = `Edit user - ${this.user.fullname}`;
		return result;
	}

	// image Preview
	uploadimg(event){
		debugger;
		const file = (event.target as HTMLInputElement).files[0];
		this.userimage = file;
		const reader = new FileReader();
		reader.onload=() => {
			this.imgpreview = reader.result as string;
		}
		reader.readAsDataURL(file)
	}

	/**
	 * Close Alert
	 *
	 * @param $event: Event
	 */
	onAlertClose($event) {
		this.hasFormErrors = false;
	}

	changeType(typeuser){
		debugger;
		console.log(typeuser._value);
		 if(typeuser._value === 'Rider'){
		 	this.isMover = false;
		 }
		 else{
			this.isMover = true;
		 }
	}
}
