import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { IUser } from '../../model/user.model';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';

interface IFormControls {
    name: FormControl;
    surname: FormControl;
    age: FormControl;
}
@Component({
    selector: 'app-basic-data-form',
    templateUrl: './basic-data-form.component.html',
    styleUrls: ['./basic-data-form.component.css']
})
export class BasicDataFormComponent implements OnInit, OnDestroy {

    @Input() public user: IUser;
    @Output() public onValidityChange: EventEmitter<boolean> = new EventEmitter();
    @Output() public onValueChange: EventEmitter<any> = new EventEmitter();
    public form: FormGroup;
    public controls: IFormControls;
    private subs: Subscription[] = [];
    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.createForm();
        this.form.patchValue(this.user);
    }

    ngOnDestroy() {
        this.subs.forEach((sub) => sub.unsubscribe());
    }

    private createForm() {
        this.controls = {
            name: new FormControl(),
            surname: new FormControl(),
            age: new FormControl()
        };
        this.form = this.formBuilder.group(this.controls);

        this.subs.push(
            this.form.statusChanges
                .debounceTime(500)
                .distinctUntilChanged().map(() => this.form.valid)
                .subscribe((valid) => {
                    this.onValidityChange.emit(valid);
                    if (valid) {
                        this.onValueChange.emit(this.form.value);
                    }
                })
        );
    }
}
