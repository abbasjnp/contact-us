import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  
  MatDialogModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatIconModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSelectModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  exports :[
    MatSelectModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ]
})
export class AppMaterialModule { }
