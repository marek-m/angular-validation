import { Injector, NgModule } from '@angular/core';
import { FormService } from './form.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceInjector } from '../../service-injector';

@NgModule({
    providers: [FormService],
    imports: [ReactiveFormsModule]
})
export class FormComponentModule {
    constructor(private injector: Injector) {
        ServiceInjector.injector = injector;
    }
}
