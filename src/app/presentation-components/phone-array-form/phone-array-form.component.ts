import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IPhone } from '../../model/user.model';
import { FormArrayComponent } from '../form-component/form-array.component';
import { AfterFormCreate, IFormControls } from '../form-component/abstract-form.component';

export interface IPhoneFormControls extends IFormControls {
    number: FormControl;
}
@Component({
    selector: 'phone-array-form',
    templateUrl: './phone-array-form.component.html',
    styleUrls: ['./phone-array-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneArrayFormComponent extends FormArrayComponent<IPhoneFormControls> implements OnInit, OnDestroy, AfterFormCreate {
    @Input() public phone: IPhone;
    @Output() public onRemove: EventEmitter<string> = new EventEmitter();

    public setFormControls(): IPhoneFormControls {
        return {
            number: new FormControl(),
        };
    }

    public afterFormCreate(form: FormGroup) {
        form.patchValue(this.phone);
        this.registerForm('phones', this.phone.id);
    }

    public ngOnInit() {
        super.ngOnInit();
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
    }
}
