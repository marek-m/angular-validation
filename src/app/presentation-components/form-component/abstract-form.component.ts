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
    private formBuilder: FormBuilder;
    private formService: FormService;
    private registeredArrayName: string;
    private registeredFormIndex: string;
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
    protected abstract registerForm(formIndex: string, arrayName?: string): void;

    protected afterFormCreate(form: FormGroup) {
    }

    protected registerSingleForm(formIndex: string, parentIndex?: string) {
        if (!this.form) {
            throw new Error('Form not created yet');
        }
        if (this.registered) {
            this.formService.removeForm(formIndex);
        }

        this.formService.addForm(formIndex, this.form, parentIndex);
        this.registeredFormIndex = formIndex;
        this.registeredArrayName = null;
        this.registeredParentIndex = parentIndex;
        this.registered = true;
    }

    protected registerArrayForm(arrayName: string, formIndex: string, parentIndex?: string) {
        if (!this.form) {
            throw new Error('Form not created yet');
        }
        if (this.registered) {
            this.formService.removeFromArray(this.registeredArrayName, this.registeredFormIndex, parentIndex);
        }

        this.form.addControl('publicId', new FormControl(formIndex));
        this.formService.addToArray(arrayName, this.form, parentIndex);

        this.registeredArrayName = arrayName;
        this.registeredFormIndex = formIndex;
        this.registeredParentIndex = parentIndex;
        this.registered = true;
    }

    protected getControlsArray(): Array<FormControl> {
        return Object.keys(this.controls).map((item) => this.controls[item]);
    }

    private createForm() {
        this.controls = this.setFormControls();
        this.form = this.formBuilder.group( this.controls );
        this.afterFormCreate(this.form);
    }

    private unregister() {
        if (this.registered) {
            if (this.registeredArrayName) {
                this.formService.removeFromArray(this.registeredArrayName, this.registeredFormIndex, this.registeredParentIndex);
            } else {
                this.formService.removeForm(this.registeredFormIndex, this.registeredParentIndex);
            }
        }
    }
}
