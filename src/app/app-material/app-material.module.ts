import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  
  MatDialogModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatIconModule,
  MatChipsModule,
  MatFormFieldModule,
  MatInputModule
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
    MatInputModule

  ],
  exports :[
    MatSelectModule,
    MatDialogModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class AppMaterialModule { }
