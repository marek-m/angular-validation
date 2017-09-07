# AngularValidation

Project presenting technique of validation multiple forms 

Handling form validity change from #child component:
````javascript
this.form.statusChanges
    .debounceTime(500)
    .distinctUntilChanged().map(() => this.form.valid)
.subscribe((valid) => this.onValidityChange.emit(valid))
````

Setting validity of multiple forms in #parent:
````javascript
// -> onValidityChange.emit() handler method
public handleValidityChange(idx: number, valid: boolean) {
    this.simpleValidity[idx] = valid;
}

// check validity of multiple forms
public get isValid(): boolean {
    return this.simpleValidity.every((valid) => valid);
}
````

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
