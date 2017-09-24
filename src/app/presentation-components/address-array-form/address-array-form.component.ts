import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAddress } from '../../model/user.model';
import { FormArrayComponent } from '../form-component/form-array.component';
import { AfterFormCreate, IFormControls } from '../form-component/abstract-form.component';

export interface IAddressFormControls extends IFormControls {
    city: FormControl;
    street: FormControl;
    postalCode: FormControl;
}
@Component({
    selector: 'address-array-form',
    templateUrl: './address-array-form.component.html',
    styleUrls: ['./address-array-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressArrayFormComponent extends FormArrayComponent<IAddressFormControls> implements OnInit, OnDestroy, AfterFormCreate {
    @Input() public address: IAddress;
    @Output() public onRemove: EventEmitter<string> = new EventEmitter();

    public setFormControls(): IAddressFormControls {
        return {
            city: new FormControl(),
            street: new FormControl(),
            postalCode: new FormControl(),
        };
    }

    public afterFormCreate(form: FormGroup) {
        form.patchValue(this.address);
        this.registerForm('addresses', this.address.id);
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
    }
}
