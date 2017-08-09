import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterDriverAgreementPage } from './register-driver-agreement';

@NgModule({
  declarations: [
    RegisterDriverAgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterDriverAgreementPage),
  ],
})
export class RegisterDriverAgreementPageModule {}
