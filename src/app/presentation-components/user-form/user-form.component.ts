import {
    ChangeDetectionStrategy, Component, EventEmitter, Injector, Input, OnDestroy, OnInit,
    Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { IUser } from '../../model/user.model';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import { FormArrayComponent } from '../form-component/form-array.component';
import { FormComponent, IFormControls } from '../form-component/form.component';

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
export class UserFormComponent extends FormComponent<IUserForm2Controls> implements OnInit, OnDestroy {

    @Input() public user: IUser;
    @Output() public onClose = new EventEmitter();

    constructor(injector: Injector) {
        super(injector);
    }

    private subs: Subscription[] = [];

    registerControls(): IUserForm2Controls {
        return {
            name: new FormControl(),
            surname: new FormControl()
        };
    }

    getFormIndex(): string {
        return 'user-form';
    }

    ngOnInit() {
        super.ngOnInit();
        this.form.patchValue(this.user);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.forEach((sub) => sub.unsubscribe());
    }
}
