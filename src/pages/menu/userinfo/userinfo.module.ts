import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserinfoPage } from './userinfo';
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    UserinfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserinfoPage),
    HttpModule
  ],
})
export class UserinfoPageModule {}
