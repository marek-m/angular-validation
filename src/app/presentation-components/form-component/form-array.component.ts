import { Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormService } from '../../form.service';
import { IFormControls } from './form.component';

export abstract class FormArrayComponent<T extends IFormControls> implements OnInit, OnDestroy {

    protected form: FormGroup;
    protected controls: T;
    private formBuilder: FormBuilder;
    private formService: FormService;
    constructor(injector: Injector) {
        this.formBuilder = injector.get(FormBuilder);
        this.formService = injector.get(FormService);
    }

    ngOnInit() {
        this.createForm();
    }

    ngOnDestroy() {
        this.formService.removeFromArray(this.getArrayName(), this.getFormIndex());
    }

    abstract registerControls(): T;
    abstract getFormIndex(): string;
    abstract getArrayName(): string;

    private createForm() {
        this.controls = this.registerControls();
        const controlsWithKey = Object.assign({}, this.controls, {publicId: this.getFormIndex()});
        this.form = this.formBuilder.group(controlsWithKey);
        this.formService.addToArray(this.getArrayName(), this.form);
    }
}
