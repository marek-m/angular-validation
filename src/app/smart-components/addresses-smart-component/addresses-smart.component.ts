import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddress } from '../../model/user.model';

@Component({
    selector: 'addresses-smart-component',
    templateUrl: './addresses-smart.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressesSmartComponent {
    @Input() public addresses: IAddress[];
    @Output() public onRemove: EventEmitter<string> = new EventEmitter();
    @Output() public onAdd = new EventEmitter();
}
