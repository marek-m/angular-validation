import { Component, OnInit } from '@angular/core';
import { IUser } from '../../model/user.model';
import { getUsers } from '../../app.component';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

    public users: IUser[] = [];
    public simpleValidity: boolean[] = [];

    constructor() {
    }

    ngOnInit() {
        this.users = getUsers;
        this.simpleValidity = this.users.map(() => false);
    }

    public handleValidityChange(idx: number, valid: boolean) {
        this.simpleValidity[idx] = valid;
    }

    public handleValueChange(value) {
        console.log(value);
    }

    public get isValid(): boolean {
        return this.simpleValidity.every((valid) => valid);
    }
}
