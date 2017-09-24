import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { IAddress, IPhone, IUser } from '../../model/user.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { FormService } from '../../form.service';

@Component({
    selector: 'user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserContainerComponent implements OnInit {

    public user$: Observable<IUser>;
    public addresses$: Observable<IAddress[]>;
    public phones$: Observable<IPhone[]>;
    public form: FormGroup;

    constructor(private formService: FormService,
                private userService: UsersService) {
    }

    public ngOnInit(): void {
        this.form = this.formService.form;
        this.user$ = Observable.of(this.userService.getUsers()[0]);
        this.addresses$ = this.user$.map((user) => user.addresses);
        this.phones$ = this.user$.map((user) => user.phones);
    }
    public showValue() {
        if (this.form.valid) {
            console.log(this.form.value);
        }
    }

    public get formValid(): boolean {
        return this.form.valid;
    }
}
