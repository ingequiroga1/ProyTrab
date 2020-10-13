//Angular
import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//NGRX
import { Store } from '@ngrx/store';

//State
import { AppState } from '../../../core/reducers/index';


import { ToolbarService } from '../../services/toolbar.service';
import { MoverService } from '../../services/mover.service';
import { UserMovencoModel } from '../../../core/_base/layout/models/usermovenco.model';


import { User } from '../../../core/auth/_models/user.model';
import { UserOnServerCreated } from '../../../core/auth/_actions/user.actions';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'kt-custom-page1',
  templateUrl: './custom-page1.component.html',
  styleUrls: ['./custom-page1.component.scss']
})
export class CustomPage1Component implements OnInit, AfterViewChecked {

  // usermovenco = new UserMovencoModel();
  userForm: FormGroup;

  usermovenco = new User();
  hasFormErrors = false;
  

  // usermovenco2: UserMovencoModel = {
  //   'userTypeId': 'Mover',
  //   'stationId': 1,
  //   'statusId': 'Activo',
  //   'userName': 'VQuiroga',
  //   'userSurname': 'Victor',
  //   'userLastname': 'Quiroga',
  //   'userRole': 'Admin',
  //   'userArea': 'Mercadotecnia',
  //   'userBirthday': '1985-10-15T17:51:18.439Z',
  //   'userMobile': '4771731602',
  //   'expirationDate': '2020-09-22T17:51:18.439Z',
  //   'bloodtype': 'A',
  //   'alergiesCondition': 'ninguno',
  //   'email': 'ingequiroga1@gmail.com',
  //   'street': 'villa genova',
  //   'interiorNumber': '109',
  //   'exteriorNumber': '1',
  //   'zipCode': '37330',
  //   'neighborhood': 'villas del country 3',
  //   'state': 'gto',
  //   'city': 'Leon',
  //   'contactName': '4771731602',
  //   'contactSurname': 'Ximena',
  //   'contactLastname': 'Quiroga',
  //   'contactPhone': '4771731602',
  //   'classvehicleId': 'Basico',
  //   'shareBalance': true,
  //   'addUser': true
  // };

  constructor(private toolbarService: ToolbarService,
    private _moverService: MoverService,
    private moverService: MoverService,
    private fb : FormBuilder,
    private store:Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.userForm = this.fb.group({
      userType: [this.usermovenco.userTypeId],
      stationId:[this.usermovenco.statusId],
      statusId:[this.usermovenco.statusId],
      userName:[this.usermovenco.username, Validators.compose([Validators.pattern('^[a-zA-Z ]*$'), Validators.required])],
      userSurname:[this.usermovenco.userSurname, Validators.compose([Validators.pattern('^[a-zA-Z ]*$'), Validators.required])],
      userLastname: [this.usermovenco.userLastname, Validators.compose([Validators.pattern('^[a-zA-Z ]*$'), Validators.required])],
      userBirthday:[this.usermovenco.userBirthday],
      userMobile:[this.usermovenco.userMobile],
      email:[this.usermovenco.email, Validators.compose([Validators.required, Validators.email])],
      expirationDate: [this.usermovenco.expirationDate],
      street:[this.usermovenco.street],
      exteriorNumber:[this.usermovenco.exteriorNumber],
      interiorNumber:[this.usermovenco.interiorNumber],
      zipCode: [this.usermovenco.zipCode],
      neighborhood:[this.usermovenco.street],
      state:[this.usermovenco.state],
      city:[this.usermovenco.city],
      userArea: [this.usermovenco.userArea],
      bloodtype:[this.usermovenco.statusId],
      alergiesCondition:[this.usermovenco.alergiesCondition],
      contactName: [this.usermovenco.contactName],
      contactSurname:[this.usermovenco.contactSurname],
      contactLastname:[this.usermovenco.contactLastname],
      contactPhone:[this.usermovenco.contactPhone],

    })
  }

  isControlInvalid(controlName: string): boolean {
    debugger;
		const control = this.userForm.controls[controlName];
		const result = control.invalid && control.touched;
		return result;
	}

  saveCust(){
    debugger;
    this.hasFormErrors = false;
    const controls = this.userForm.controls;
    /** check form */
		if (this.userForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			return;
		}

    this.store.dispatch(new UserOnServerCreated ({ user: this.usermovenco}));
    this.userDetail(17);
  }

  userDetail(userId){
    this.router.navigate(['users/detalle', userId], { relativeTo: this.activatedRoute });
  }

  // guardarusermovenco(){
  //   this.usermovenco.addUser = true;
  //   this.usermovenco.classvehicleId = 'Basico';
  //   this.usermovenco.shareBalance = true;
  //   this.usermovenco.stationId = 1;
  //   this.usermovenco.statusId = 'Activo';
  //   this.usermovenco.userTypeId = 'Mover'

  //   debugger;
  //   console.log(this.usermovenco);

  //   this.moverService.crearUserMovenco(this.usermovenco)
  //   .subscribe (resp => {
  //     console.log(resp);
  //   });
  // }

  ngAfterViewChecked() {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/community'}, children:[ {name:'Alta de Usuarios', url:'/page1'}]});
  }

}
