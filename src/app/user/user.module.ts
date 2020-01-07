import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserComponent } from './user.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {AppMaterialModule} from './../app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const userRoutes :Routes =[
  {path:'',component:UserComponent,
    children:[
      {path:'contact-us',component:ContactUsComponent},
      
    ]},
]

@NgModule({
  declarations: [UserComponent, ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(userRoutes),
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule
    
    
    
  ],
  providers:[DatePipe]
})
export class UserModule { }
