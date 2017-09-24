import { OnDestroy, OnInit } from '@angular/core';
import { AbstractFormComponent, IFormControls } from './abstract-form.component';

export abstract class FormArrayComponent<T extends IFormControls> extends AbstractFormComponent<T> {
    constructor() {
        super();
    }

    protected registerForm(arrayName: string, formIndex: string) {
        this.registerArrayForm(arrayName, formIndex);
    }
}

