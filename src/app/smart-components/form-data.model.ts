import { Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';

export class IFormData<T> {
    public valid = false;
    public dirty = false;
    public data: T;
    constructor(data: T) {}
};

interface IGlobalForm {
    basicData: IFormData<BasicDataModel>;
    addresses: IFormData<AddressModel[]>;
}

interface BasicDataModel {
    name: string;
    surname: string;
    phoneNo: string;
}

interface AddressModel {
    streetName: string;
    city: string;
    country: string;
}


// class GlobalFormComponent {
//     public globalForm: IGlobalForm;
//     @Input set formData(user: UserPayload) {
//         if (!user) return;
//         this.globalForm = {
//             basicData = new IFormData<BasicDataModel>(user.basicData),
//             addresses = new IFormData<Addresses[]>(user.basicData.addresses)
//         }
//     }
// }
//
// class BasicDataFormComponent {
//     @Input
//     @Output onDataChange
// }
//
//
// <tab1 [isValid]="globalForm.basicData.valid">
// <tab2 [isValid]="globalForm.addresses.valid">
