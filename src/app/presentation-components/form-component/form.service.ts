import {Injectable} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class FormService {
    public form: FormGroup;
    public formChange$: Subject<FormGroup> = new Subject();
    private formUUIDGenerator: IterableIterator<string>;
    private UNIQUE_NAME = 'formIndex';
    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({});
        this.formChange$.next(this.form);
        this.formUUIDGenerator = this.generateUniqueId();
    }

    /**
     * Adds form to global FormGroup.
     * @param {FormGroup} controls
     * @param {string} parentIndex
     * @returns {generated form unique-id}
     */
    public addForm(formName: string, controls: FormGroup, parentIndex?: string): string {
        const formGroup = this.getFormGroup(parentIndex);
        const uniqueId = this.getUniqueId();

        const uniqueCtrl = new FormControl(uniqueId);
        uniqueCtrl.disable();
        controls.addControl(this.UNIQUE_NAME, uniqueCtrl);
        formGroup.addControl(formName, controls);
        this.formChange$.next(this.form);
        return uniqueId;
    }

    public removeForm(index: string, parentIndex?: string) {
        const formGroup = this.getFormGroup(parentIndex);
        Object.keys(formGroup.controls).some((controlKey: string) => {
            if (formGroup.get(controlKey).get(this.UNIQUE_NAME).value === index) {
                formGroup.removeControl(controlKey);
                return true;
            }
        });
        this.formChange$.next(this.form);
    }

    public addToArray(arrayName: string, controls: FormGroup, parentIndex?: string): string {
        const formGroup = this.getFormGroup(parentIndex);
        let formArray = <FormArray>formGroup.controls[arrayName];
        if (!formArray) {
            formGroup.addControl(arrayName, this.formBuilder.array([]));
            formArray = <FormArray>formGroup.controls[arrayName];
            this.formChange$.next(this.form);
        }
        const uniqueId = this.getUniqueId();
        const uniqueCtrl = new FormControl(uniqueId);
        uniqueCtrl.disable();
        controls.addControl(this.UNIQUE_NAME, uniqueCtrl);
        formArray.push(controls);
        this.formChange$.next(this.form);
        return uniqueId;
    }

    public removeFromArray(arrayName: string, index: string, parentIndex?: string) {
        const formGroup = this.getFormGroup(parentIndex);
        const formArray = <FormArray>formGroup.controls[arrayName];
        if (!formArray) {
            return;
        }
        const removeIndex = formArray.getRawValue().findIndex((item) => item[this.UNIQUE_NAME] === index);
        formArray.removeAt(removeIndex);
        if (formArray.length === 0) {
            formGroup.removeControl(arrayName);
        }
        this.formChange$.next(this.form);
    }

    private getUniqueId() {
        return this.formUUIDGenerator.next().value;
    }

    private searchForm(formIndex: string, parent: FormGroup): AbstractControl {
        if (parent.contains(this.UNIQUE_NAME) && parent.get(this.UNIQUE_NAME).value === formIndex) {
            return parent;
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
        const idx = parent.getRawValue().findIndex((item) => item[this.UNIQUE_NAME] === formIndex);
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
                throw new Error(`Cannot find parent FormGroup for index ${parentIndex}`);
            }
        } else {
            result = this.form;
        }
        return result;
    }

    private * generateUniqueId() {
        for (let i = 10000; i < 100000000; i++) {
            yield `uuid-${i}`;
        }
    }
}
