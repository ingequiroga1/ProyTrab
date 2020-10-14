import { BaseModel } from '../../_base/crud';

export class Base extends BaseModel {

    baseId: number;
    name: string;
    baseNumber: string;
    statusId: string;
    clientId: number;
    contactId: number
    addressId: number

  clear(): void {
    this.baseId = undefined;
    this.name = '';
    this.baseNumber = '';
    this.statusId  = '';
    this.clientId = undefined;
    this.contactId = undefined;
    this.addressId = undefined
  }
}
