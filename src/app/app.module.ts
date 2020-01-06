import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes:Routes =[
  {
    path:'user',
    loadChildren:()=>import('./user/user.module').then(m=>m.UserModule)
  },
  {
    path:'',redirectTo:'/user/contact-us',pathMatch:'full'
  }
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  RouterModule.forRoot(routes),
  BrowserAnimationsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
