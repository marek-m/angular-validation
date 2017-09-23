import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { IUser } from '../../model/user.model';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import { AfterFormCreate, IFormControls } from '../form-component/abstract-form.component';
import { FormComponent } from '../form-component/form.component';

export interface IUserForm2Controls extends IFormControls {
    name: FormControl;
    surname: FormControl;
}
@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent extends FormComponent<IUserForm2Controls> implements OnInit, OnDestroy, AfterFormCreate {
    @Input() public user: IUser;
    @Output() public onClose = new EventEmitter();

    constructor() {
        super();
    }

    setFormControls(): IUserForm2Controls {
        return {
            name: new FormControl(),
            surname: new FormControl()
        };
    }

    afterFormCreate(form: FormGroup): void {
        form.patchValue(this.user);
        this.registerForm('user-single-form');
    }
}
