import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterUserAgreementPage } from './register-user-agreement';

@NgModule({
  declarations: [
    RegisterUserAgreementPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterUserAgreementPage),
  ],
})
export class RegisterUserAgreementPageModule {}
