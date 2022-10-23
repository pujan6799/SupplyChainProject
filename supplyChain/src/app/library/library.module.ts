import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InteriorDialogComponent } from './interior-dialog/interior-dialog.component';
import { BoltTypesDialogComponent } from './bolt-types-dialog/bolt-types-dialog.component';
import { AddBoltTypeDialogComponent } from './add-bolt-type-dialog/add-bolt-type-dialog.component';
import { NewPartDialogComponent } from './new-part-dialog/new-part-dialog.component';
import { WheelsDialogComponent } from './wheels-dialog/wheels-dialog.component';
import { SelectTypeDialogComponent } from './select-type-dialog/select-type-dialog.component';

@NgModule({
  declarations: [
    InteriorDialogComponent,
    BoltTypesDialogComponent,
    NewPartDialogComponent,
    AddBoltTypeDialogComponent,
    WheelsDialogComponent,
    SelectTypeDialogComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [InteriorDialogComponent],
})
export class LibraryModule {}
