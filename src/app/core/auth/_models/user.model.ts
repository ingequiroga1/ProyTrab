import { BaseModel } from '../../_base/crud';
import { Address } from './address.model';
import { SocialNetworks } from './social-networks.model';

export class User extends BaseModel {
    //id: number;
   username: string;
  
  
   accessToken: string;
   refreshToken: string;
   roles: number[];
   pic: string;
   fullname: string;
   occupation: string;
   companyName: string;
  phone: string;
   address: Address;
   socialNetworks: SocialNetworks;
   clientId: number;


   userId: number;
   userTypeId: string;
   password: string;
   statusId: string;
   userName: string;
   userSurname: string;
   userLastname: string;
   userPosition: string;
   userArea: string;
   userBirthday: string;
   userMobile: number;
   expirationDate: string;
   bloodtype: string;
   stationId: number;
   alergiesCondition: string;
   email: string;
   street: string;
   interiorNumber: string;
   exteriorNumber: string;
   zipCode: string;
   neighborhood: string;
   state: string;
   city: string;
   contactName: string;
   contactSurname: string;
   contactLastname: string;
   contactPhone: number;
   RelativeId: string;


  clear(): void {
    //this.id = undefined;
    this.username = '';
    this.password = '';
    this.email = '';
   this.roles = [];
    this.fullname = '';
    this.accessToken = 'access-token-' + Math.random();
    this.refreshToken = 'access-token-' + Math.random();
    this.pic = './assets/media/users/default.jpg';
    this.occupation = '';
    this.companyName = '';
    this.phone = '';
    this.address = new Address();
    this.address.clear();
    this.socialNetworks = new SocialNetworks();
    this.socialNetworks.clear();
  }
}
