import { Component } from '@angular/core';
import { IUser } from './model/user.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
}

export const getUsers: IUser[] = [
    {
        id: '1',
        name: 'Magnus',
        surname: 'Carlsen',
        age: 30
    },
    {
        id: '2',
        name: 'Levon',
        surname: 'Aronina',
        age: 40
    },
    {
        id: '3',
        name: 'Garry',
        surname: 'Kasparov',
        age: 50
    }
];
