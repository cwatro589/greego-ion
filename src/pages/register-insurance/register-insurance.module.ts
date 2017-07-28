import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterInsurancePage } from './register-insurance';

@NgModule({
  declarations: [
    RegisterInsurancePage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterInsurancePage),
  ],
})
export class RegisterInsurancePageModule {}
