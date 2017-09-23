import { BrowserModule } from '@angular/platform-browser';
import { Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './smart-components/user-details/user-details.component';
import { BasicDataFormComponent } from './presentation-components/basic-data-form/basic-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './form.service';
import { UserFormComponent } from './presentation-components/user-form/user-form.component';
import { GeneratorService } from './smart-components/genarator.service';
import { ServiceInjector } from './service-injector';

@NgModule({
    declarations: [
        AppComponent,
        UserDetailsComponent,
        BasicDataFormComponent,
        UserFormComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [FormService, GeneratorService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceInjector.injector = injector;
    }
}
