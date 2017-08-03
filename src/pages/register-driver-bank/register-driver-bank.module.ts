import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterDriverBankPage } from './register-driver-bank';

@NgModule({
  declarations: [
    RegisterDriverBankPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterDriverBankPage),
  ],
})
export class RegisterDriverBankPageModule {}
