import { OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormService } from '../../form.service';
import { ServiceInjector } from '../../service-injector';

export interface IFormControls {
    [name: string]: FormControl;
}

export interface AfterFormCreate {
    afterFormCreate(form: FormGroup): void;
}

export abstract class AbstractFormComponent<T extends IFormControls> implements OnInit, OnDestroy {
    protected form: FormGroup;
    protected controls: T;
    private formBuilder: FormBuilder;
    private formService: FormService;
    private registeredArrayName: string;
    private registeredFormIndex: string;
    private registered = false;

    constructor() {
        this.formBuilder = ServiceInjector.injector.get(FormBuilder);
        this.formService = ServiceInjector.injector.get(FormService);
    }

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy() {
        this.unregister();
    }

    abstract setFormControls(): T;
    protected abstract registerForm(formIndex: string, arrayName?: string): void;

    protected afterFormCreate(form: FormGroup) {
    }

    private createForm() {
        this.controls = this.setFormControls();
        this.form = this.formBuilder.group(this.controls);
        this.afterFormCreate(this.form);
    }

    protected registerSingleForm(formIndex: string) {
        if (!this.form) {
            throw new Error('Form not created yet');
        }
        if (this.registered) {
            this.formService.removeForm(formIndex);
        }

        this.formService.addForm(formIndex, this.form);
        this.registeredFormIndex = formIndex;
        this.registeredArrayName = null;
        this.registered = true;
    }

    protected registerArrayForm(arrayName: string, formIndex: string) {
        if (!this.form) {
            throw new Error('Form not created yet');
        }
        if (this.registered) {
            this.formService.removeFromArray(this.registeredArrayName, this.registeredFormIndex);
        }

        this.form.addControl('publicId', new FormControl(formIndex));
        this.formService.addToArray(arrayName, this.form);

        this.registeredArrayName = arrayName;
        this.registeredFormIndex = formIndex;
        this.registered = true;
    }

    private unregister() {
        if (this.registered) {
            if (this.registeredArrayName) {
                this.formService.removeFromArray(this.registeredArrayName, this.registeredFormIndex);
            } else {
                this.formService.removeForm(this.registeredFormIndex);
            }
        }
    }
}
