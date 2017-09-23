import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { IUser } from '../../model/user.model';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import { FormArrayComponent } from '../form-component/form-array.component';
import { GeneratorService } from '../../smart-components/genarator.service';
import { AfterFormCreate, IFormControls } from '../form-component/abstract-form.component';

export interface IUserFormControls extends IFormControls {
    name: FormControl;
    surname: FormControl;
    age: FormControl;
}
@Component({
    selector: 'app-basic-data-form',
    templateUrl: './basic-data-form.component.html',
    styleUrls: ['./basic-data-form.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicDataFormComponent extends FormArrayComponent<IUserFormControls> implements OnInit, OnDestroy, AfterFormCreate {

    @Input() public user: IUser;
    @Output() public onRemove: EventEmitter<string> = new EventEmitter();

    constructor(private generator: GeneratorService) {
        super();
    }

    private subs: Subscription[] = [];

    public setFormControls(): IUserFormControls {
        return {
            name: new FormControl(),
            surname: new FormControl(),
            age: new FormControl(),
        };
    }

    public afterFormCreate(form: FormGroup) {
        form.patchValue(this.user);
        this.registerForm('users', this.user.id);
    }

    public ngOnInit() {
        super.ngOnInit();
        // write some op here
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.subs.forEach((sub) => sub.unsubscribe());
    }
}
