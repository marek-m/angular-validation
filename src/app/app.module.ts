import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, ChangeDetectorRef, Injector, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AddressArrayFormComponent } from './presentation-components/address-array-form/address-array-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormService } from './presentation-components/form-component/form.service';
import { UserFormComponent } from './presentation-components/user-form/user-form.component';
import { ServiceInjector } from './service-injector';
import {
    MdButtonModule,
    MdFormFieldModule,
    MdIconModule,
    MdInputModule,
    MdOptionModule,
    MdSelectModule,
    MdStepperModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserContainerComponent } from './smart-components/containers/user-container.component';
import { UsersService } from './users.service';
import { PhoneArrayFormComponent } from './presentation-components/phone-array-form/phone-array-form.component';
import { AddressesSmartComponent } from './smart-components/addresses-smart-component/addresses-smart.component';
import { AddressesContainerComponent } from './smart-components/addresses-container-component/addresses-container.component';
import { FormComponentModule } from './presentation-components/form-component/form-component.module';

@NgModule({
    declarations: [
        AppComponent,
        UserContainerComponent,
        AddressArrayFormComponent,
        PhoneArrayFormComponent,
        AddressesSmartComponent,
        AddressesContainerComponent,
        UserFormComponent
    ],
    imports: [
        MdStepperModule,
        MdFormFieldModule,
        MdButtonModule,
        MdInputModule,
        MdIconModule,
        MdSelectModule,
        MdOptionModule,
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormComponentModule
    ],
    providers: [UsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
