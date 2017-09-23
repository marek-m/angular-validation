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

interface IFormControls {
    [name: string]: FormControl;
}
export interface IUserFormControls extends IFormControls {
    name: FormControl;
    surname: FormControl;
    age: FormControl;
}
@Component({
    selector: 'app-basic-data-form',
    templateUrl: './basic-data-form.component.html',
    styleUrls: ['./basic-data-form.component.css']
})
export class BasicDataFormComponent extends FormArrayComponent<IUserFormControls> implements OnInit, OnDestroy {

    @Input() public user: IUser;

    constructor(injector: Injector) {
        super(injector);
    }

    private subs: Subscription[] = [];

    registerControls(): IUserFormControls {
        return {
            name: new FormControl(),
            surname: new FormControl(),
            age: new FormControl(),
        };
    }

    getFormIndex(): string {
        return this.user.id;
    }

    getArrayName(): string {
        return 'users';
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
