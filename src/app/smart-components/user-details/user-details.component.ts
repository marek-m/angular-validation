import { ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { IUser, IUserData } from '../../model/user.model';
import { getUsers } from '../../app.component';
import { FormService } from '../../form.service';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailsComponent implements OnInit {

    public users: IUser[] = [];
    public user: IUserData;
    public showUserForm = true;
    public asyncUsers$: Observable<IUser[]>;

    constructor(private formService: FormService) {
    }

    ngOnInit() {
        this.asyncUsers$ = Observable.of(getUsers).delay(4000);
        this.users = getUsers;
        this.user = {
            name: 'Marek',
            surname: 'Matyśkiewicz'
        };
    }

    public addUser() {
        this.users.push({id: new Date().getTime() + ''} as IUser);
    }

    public removeUser(id: string) {
        this.users = this.users.filter((item) => item.id !== id);
    }
    public get form(): FormGroup {
        return this.formService.form;
    }
}
