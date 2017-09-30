import {AbstractFormComponent, IFormControls} from './abstract-form.component';
import { FormGroup } from '@angular/forms';

export abstract class FormArrayComponent<T extends IFormControls> extends AbstractFormComponent<T> {

    protected registerForm(arrayName: string, parentIndex?: string | FormGroup) {
        this.registerArrayForm(arrayName, parentIndex);
    }
}
