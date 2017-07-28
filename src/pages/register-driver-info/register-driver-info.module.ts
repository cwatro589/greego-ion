import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterDriverInfoPage } from './register-driver-info';

@NgModule({
  declarations: [
    RegisterDriverInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterDriverInfoPage),
  ],
})
export class RegisterDriverInfoPageModule {}
