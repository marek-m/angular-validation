export interface IUser {
    id: string;
    name: string;
    surname: string;
    age: number;
    addresses: IAddress[];
    phones: IPhone[];
}

export interface IAddress {
    id: string;
    city: string;
    street: string;
    postalCode: string;
}

export interface IPhone {
    id: string;
    type: string;
    number: string;
}

export interface IUserData {
    name: string;
    surname: string;
}

