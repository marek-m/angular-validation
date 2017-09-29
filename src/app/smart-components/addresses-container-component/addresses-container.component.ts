import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IAddress, IPhone } from '../../model/user.model';

@Component({
    selector: 'addresses-container',
    templateUrl: './addresses-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesContainerComponent {
    @Input() public addresses: IAddress[];
    @Input() public phones: IPhone[];
    public handleAdd() {
        this.addresses = [...this.addresses, {
            id: new Date().getTime().toString(),
            city: '',
            street: '',
            postalCode: '',
        }];
    }

    public handleRemove(id: string) {
        this.addresses = this.addresses.filter((item) => item.id !== id);
    }
}
