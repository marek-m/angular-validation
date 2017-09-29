import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';

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

    private extractControls(list: FormControl[], control: AbstractControl) {
        if (control instanceof FormControl) {
            list.push(control);
        } else {
            if (control instanceof FormGroup) {
                Object.keys(control.controls).forEach((key) => {
                    this.extractControls(list, control.get(key));
                });
            }
            if (control instanceof FormArray) {
                control.controls.forEach((child) => {
                    this.extractControls(list, child);
                });
            }
        }
    }

    private searchForm(formIndex: string): FormGroup {
        const list: FormControl[] = [];
        this.extractControls(list, this.form);
        for (const ctrl of list) {
            if (ctrl.value === formIndex && ctrl.parent instanceof FormGroup) {
                return ctrl.parent;
            }
        }
    }

    private getFormGroup(parentIndex?: string): FormGroup {
        let result: FormGroup = null;
        if (parentIndex) {
            result = <FormGroup>this.searchForm(parentIndex);
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
