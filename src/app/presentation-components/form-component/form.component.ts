import { AfterViewChecked, Injector, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import { FormService } from '../../form.service';

export interface IFormControls {
    [name: string]: FormControl;
}

export abstract class FormComponent<T extends IFormControls> implements OnInit, OnDestroy {

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
        this.formService.removeForm(this.getFormIndex());
    }

    abstract registerControls(): T;
    abstract getFormIndex(): string;

    private createForm() {
        this.controls = this.registerControls();
        this.form = this.formBuilder.group(this.controls);
        this.formService.addForm(this.getFormIndex(), this.form);
    }
}
