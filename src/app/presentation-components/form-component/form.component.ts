import {AbstractFormComponent, IFormControls} from './abstract-form.component';

export abstract class FormComponent<T extends IFormControls> extends AbstractFormComponent<T> {

    protected registerForm(formName: string, parentIndex?: string) {
        this.registerSingleForm(formName, parentIndex);
    }
}
