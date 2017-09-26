import {Injectable} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FormService {
    public form: FormGroup;
    public formChange$: Subject<FormGroup> = new Subject();

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({});
        this.formChange$.next(this.form);
    }

    public addForm(index: string, controls: FormGroup, parentIndex?: string) {
        const formGroup = this.getFormGroup(parentIndex);
        formGroup.addControl(index, controls);
        this.formChange$.next(this.form);
    }

    public removeForm(index: string, parentIndex?: string) {
        const formGroup = this.getFormGroup(parentIndex);
        formGroup.removeControl(index);
        this.formChange$.next(this.form);
    }

    public addToArray(arrayName: string, controls: FormGroup, parentIndex?: string) {
        const formGroup = this.getFormGroup(parentIndex);
        let formArray = <FormArray>formGroup.controls[arrayName];
        if (!formArray) {
            formGroup.addControl(arrayName, this.formBuilder.array([]));
            formArray = <FormArray>formGroup.controls[arrayName];
            this.formChange$.next(this.form);
        }
        formArray.push(controls);
        this.formChange$.next(this.form);
    }

    public removeFromArray(arrayName: string, index: string, parentIndex?: string) {
        const formGroup = this.getFormGroup(parentIndex);
        const formArray = <FormArray>formGroup.controls[arrayName];
        if (!formArray) {
            return;
        }
        const removeIndex = formArray.getRawValue().findIndex((item) => item.publicId === index);
        formArray.removeAt(removeIndex);
        if (formArray.length === 0) {
            formGroup.removeControl(arrayName);
        }
        this.formChange$.next(this.form);
    }

    private searchForm(formIndex: string, parent: FormGroup): AbstractControl {
        if (parent.contains(formIndex)) {
            return parent.get(formIndex);
        } else {
            let result = null;
            Object.keys(parent.controls).forEach((controlKey: string) => {
                const nestedParent = parent.get(controlKey);
                if (nestedParent instanceof FormGroup) {
                    result = this.searchForm(formIndex, nestedParent);
                }
                if (nestedParent instanceof FormArray) {
                    result = this.searchFormArray(formIndex, nestedParent);
                }
            });
            return result;
        }
    }

    private searchFormArray(formIndex: string, parent: FormArray) {
        const idx = parent.getRawValue().findIndex((item) => item.publicId === formIndex);
        if (idx > -1) {
            return parent.at(idx);
        } else {
            let result = null;
            parent.controls.forEach((control) => {
                if (control instanceof FormArray) {
                    result = this.searchFormArray(formIndex, control);
                }
                if (control instanceof FormGroup) {
                    result = this.searchForm(formIndex, control);
                }
            });
            return result;
        }
    }

    private getFormGroup(parentIndex?: string): FormGroup {
        let result: FormGroup = null;
        if (parentIndex) {
            result = <FormGroup>this.searchForm(parentIndex, this.form);
            if (!result) {
                throw new Error(`Cannot find parent FormGroup for index '${parentIndex}'`);
            }
        } else {
            result = this.form;
        }
        return result;
    }
}
