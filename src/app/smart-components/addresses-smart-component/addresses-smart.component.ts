import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddress, IPhone } from '../../model/user.model';

@Component({
    selector: 'addresses-smart-component',
    templateUrl: './addresses-smart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesSmartComponent {
    @Input() public addresses: IAddress[];
    @Input() public phones: IPhone[];
    @Output() public onRemove: EventEmitter<string> = new EventEmitter();
    @Output() public onAdd = new EventEmitter();
}
