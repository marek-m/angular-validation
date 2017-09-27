import {AbstractFormComponent, IFormControls} from './abstract-form.component';

export abstract class FormArrayComponent<T extends IFormControls> extends AbstractFormComponent<T> {

    protected registerForm(arrayName: string, parentIndex?: string) {
        this.registerArrayForm(arrayName, parentIndex);
    }
}
