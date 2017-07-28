import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginVerifyPage } from './login-verify';

@NgModule({
  declarations: [
    LoginVerifyPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginVerifyPage),
  ],
})
export class LoginVerifyPageModule {}
