import { Injectable } from '@angular/core';
import { IUser } from './model/user.model';

@Injectable()
export class UsersService {
    public getUsers(): IUser[] {
        return [
            {
                id: '1',
                name: 'Magnus',
                surname: 'Carlsen',
                age: 30,
                addresses: [
                    {
                        id: '1',
                        postalCode: '12345',
                        city: 'Poznań',
                        street: 'Kolorowa'
                    }
                ],
                phones: [
                    {
                        id: '1',
                        type: 'PRIVATE',
                        number: '123123123'
                    },
                    {
                        id: '2',
                        type: 'PRIVATE',
                        number: '333111222'
                    }
                ]
            },
            {
                id: '2',
                name: 'Levon',
                surname: 'Aronina',
                age: 40,
                addresses: [],
                phones: []
            },
            {
                id: '3',
                name: 'Garry',
                surname: 'Kasparov',
                age: 50,
                addresses: [],
                phones: []
            }
        ];
    }
}

