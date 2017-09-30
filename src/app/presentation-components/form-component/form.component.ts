import {AbstractFormComponent, IFormControls} from './abstract-form.component';
import { FormGroup } from '@angular/forms';

export abstract class FormComponent<T extends IFormControls> extends AbstractFormComponent<T> {

    protected registerForm(formName: string, parentIndex?: string | FormGroup) {
        this.registerSingleForm(formName, parentIndex);
    }

}
