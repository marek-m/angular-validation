import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserDetailsComponent } from './smart-components/user-details/user-details.component';
import { BasicDataFormComponent } from './presentation-components/basic-data-form/basic-data-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        AppComponent,
        UserDetailsComponent,
        BasicDataFormComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
