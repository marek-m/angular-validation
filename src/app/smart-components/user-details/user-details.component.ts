import { Component, OnChanges, OnInit } from '@angular/core';
import { IUser, IUserData } from '../../model/user.model';
import { getUsers } from '../../app.component';
import { FormService } from '../../form.service';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    public users: IUser[] = [];
    public user: IUserData;
    public showUserForm = true;

    constructor(private formService: FormService) {
    }

    ngOnInit() {
        this.users = getUsers;
        this.user = {
            name: 'Marek',
            surname: 'Matyśkiewicz'
        };
    }

    public addUser() {
        this.users.push({id: new Date().getTime() + ''} as IUser);
    }

    public removeUser() {
        this.users.pop();
    }
    public get form(): FormGroup {
        return this.formService.form;
    }
}
