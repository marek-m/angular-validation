import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FormService {
    public form: FormGroup;
    public formChange$: Subject<FormGroup> = new Subject();

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({});
        this.formChange$.next(this.form);
    }

    public addForm(index: string, controls: FormGroup) {
        this.form.setControl(index, controls);
        this.form.registerControl(index, controls);
        this.formChange$.next(this.form);
    }

    public removeForm(index: string) {
        this.form.removeControl(index);
        this.formChange$.next(this.form);
    }

    public addToArray(arrayName: string, controls: FormGroup) {
        let formArray = <FormArray>this.form.controls[arrayName];
        if (!formArray) {
            this.form.setControl(arrayName, this.formBuilder.array([]));
            formArray = <FormArray>this.form.controls[arrayName];
            this.formChange$.next(this.form);
        }
        formArray.push(controls);
        this.form.registerControl(arrayName, controls);
        this.formChange$.next(this.form);
    }

    public removeFromArray(arrayName: string, index: string) {
        let formArray = <FormArray>this.form.controls[arrayName];
        if (!formArray) {
            this.form.setControl(arrayName, this.formBuilder.array([]));
            formArray = <FormArray>this.form.controls[arrayName];
        }
        const removeIndex = formArray.getRawValue().findIndex((item) => item.publicId === index);
        formArray.removeAt(removeIndex);
        if (formArray.length === 0) {
            this.form.removeControl(arrayName);
        }
        this.formChange$.next(this.form);
    }
}
