import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterDriverPrefPage } from './register-driver-pref';

@NgModule({
  declarations: [
    RegisterDriverPrefPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterDriverPrefPage),
  ],
})
export class RegisterDriverPrefPageModule {}
