import { Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { values } from 'lodash';
import { FormService } from './form.service';
import { ServiceInjector } from '../../service-injector';

export interface IFormControls {
    [name: string]: FormControl;
}

export interface IAfterFormCreate {
    afterFormCreate(form: FormGroup): void;
}

export abstract class AbstractFormComponent<T extends IFormControls> implements OnInit, OnDestroy {
    @Input() public formReady: any;

    protected form: FormGroup;
    protected controls: T;
    /**
     * Unique form index. Unique for global form context.
     */
    protected formUUID: string;
    private formBuilder: FormBuilder;
    private formService: FormService;
    private registeredArrayName: string;
    private registeredFormName: string;
    private registeredParentIndex: string;
    private registered = false;

    constructor() {
        this.formBuilder = ServiceInjector.injector.get(FormBuilder);
        this.formService = ServiceInjector.injector.get(FormService);
    }

    public ngOnInit() {
        this.createForm();
        this.formReady = {};
    }

    public ngOnDestroy() {
        this.unregister();
    }

    protected abstract setFormControls(): T;

    protected abstract registerForm(formName: string, arrayName?: string): void;

    protected includeFormValues(): { [key: string]: any } {
        return {};
    }

    protected afterFormCreate(form: FormGroup) {
    }

    protected registerSingleForm(formName: string, parentIndex?: string) {
        if (!this.form) {
            throw new Error('Form not created yet');
        }
        if (this.registered) {
            this.formService.removeForm(formName);
        }

        this.formUUID = this.formService.addForm(formName, this.form, parentIndex);
        this.registeredArrayName = null;
        this.registeredFormName = formName;
        this.registeredParentIndex = parentIndex;
        this.registered = true;
    }

    protected registerArrayForm(arrayName: string, parentIndex?: string) {
        if (!this.form) {
            throw new Error('Form not created yet');
        }
        if (this.registered) {
            this.formService.removeFromArray(this.registeredArrayName, this.formUUID, parentIndex);
        }

        this.formUUID = this.formService.addToArray(arrayName, this.form, parentIndex);

        this.registeredArrayName = arrayName;
        this.registeredParentIndex = parentIndex;
        this.registered = true;
    }

    private createForm() {
        this.controls = this.setFormControls();
        this.form = this.formBuilder.group(this.controls);
        const additionalFormData = this.includeFormValues();
        if (Object.keys(additionalFormData).length > 0) {
            Object.keys(additionalFormData).forEach((key) => {
                this.form.addControl(key, new FormControl(additionalFormData[key]));
            });

        }
        this.afterFormCreate(this.form);
    }

    private unregister() {
        if (this.registered) {
            if (this.registeredArrayName) {
                this.formService.removeFromArray(this.registeredArrayName, this.formUUID, this.registeredParentIndex);
            } else {
                this.formService.removeForm(this.formUUID, this.registeredParentIndex);
            }
        }
    }
}
