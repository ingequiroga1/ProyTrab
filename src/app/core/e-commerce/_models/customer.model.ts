import { BaseModel } from '../../_base/crud';
import date from '../../../../assets/plugins/formvalidation/src/js/validators/date';

export class CustomerModel  extends BaseModel {
  //  id: number;
    firstName: string;
    lastName: string;
  //  email: string;
    userName: string;
    gender: string;
    status: number; // 0 = Active | 1 = Suspended | Pending = 2
    dateOfBbirth: string;
    dob: Date;
    ipAddress: string;
    type: number; // 0 = Business | 1 = Individual


   clientId: number;
    clientNumber: string;
    name: string;
    changePassword: true;
    password: string;
    rfc: string;
    email: string;
    mobile: string;
    logo: string;
    pathLogo: string;
    clabe: string;
    statusId: string;
    addressId: number;
    contactId: number;
    

 
    clientName: string;
    clientEmail: string;
    clientPhone: number;
  
    contactSurname: string;
    contactLastname: string;
    street: string;
    interiorNumber: string;
    exteriorNumber: string;
    zipCode: string;
    neighborhood: string;
    state: string;
    city: string;
    createDate: string;



  // clear() {
  //   this.dob = new Date();
  //   this.firstName = '';
  //   this.lastName = '';
  //   this.email = '';
  //   this.userName = '';
  //   this.gender = 'Female';
  //   this.ipAddress = '';
  //   this.type = 1;
  //   this.status = 1;
  // }

  clear() {
    this.name = '';
    this.rfc = '';
    this.email = '';
    this.mobile = '';
    this.pathLogo = '';
    this.clabe = '';
    this.addressId = 1;
    this.contactId = 1;
  }

}
