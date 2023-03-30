import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/compiler";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { PollComponent } from "./poll.component";

const route: Routes = [
    {
        path: '',
        component: PollComponent,
    }
]
@NgModule({
    imports: [
        FormsModule, CommonModule,
        RouterModule.forChild(route),
    ],
    declarations: [
        PollComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
})

export class PollModule {

}