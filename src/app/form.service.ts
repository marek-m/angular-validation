import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Injectable()
export class FormService {
    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({});
    }

    public addForm(index: string, controls: FormGroup) {
        this.form.setControl(index, controls);
    }

    public removeForm(index: string) {
        this.form.removeControl(index);
    }

    public addToArray(arrayName: string, controls: FormGroup) {
        let formArray = <FormArray>this.form.controls[arrayName];
        if (!formArray) {
            this.form.setControl(arrayName, this.formBuilder.array([]));
            formArray = <FormArray>this.form.controls[arrayName];
        }
        formArray.push(controls);
    }

    public removeFromArray(arrayName: string, index: string) {
        let formArray = <FormArray>this.form.controls[arrayName];
        if (!formArray) {
            this.form.setControl(arrayName, this.formBuilder.array([]));
            formArray = <FormArray>this.form.controls[arrayName];
        }
        const removeIndex = formArray.getRawValue().findIndex((item) => item.publicId === index);
        formArray.removeAt(removeIndex);
    }
}
