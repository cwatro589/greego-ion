import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginVerifyPage } from '../pages/login-verify/login-verify';
import { PhoneupdatePage } from '../pages/phoneupdate/phoneupdate';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { RegisterPage } from '../pages/register/register';
import { RegisterUserPage } from '../pages/register-user/register-user';
import { RegisterCarInfoPage } from '../pages/register-car-info/register-car-info';
import { RegisterFacephotoPage } from '../pages/register-facephoto/register-facephoto';
import { RegisterDriverVerifyPage } from '../pages/register-driver-verify/register-driver-verify';
import { RegisterDriverPrefPage } from '../pages/register-driver-pref/register-driver-pref';
import { RegisterDriverBankPage } from '../pages/register-driver-bank/register-driver-bank';
import { RegisterDriverAgreementPage, MathcesCategoryPipe } from '../pages/register-driver-agreement/register-driver-agreement';
import { RegisterUserCompletedPage } from '../pages/register-user-completed/register-user-completed';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FormDataService }    from '../form/formData.service';
import { RegisterFlowService }    from '../registerFlow/registerFlow.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LoginVerifyPage,
    PhoneupdatePage,
    ForgotPasswordPage,
    RegisterPage,
    RegisterUserPage,
    RegisterCarInfoPage,
    RegisterFacephotoPage,
    RegisterDriverVerifyPage,
    RegisterDriverPrefPage,
    RegisterDriverBankPage,
    RegisterDriverAgreementPage,
    RegisterUserCompletedPage,
    MathcesCategoryPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LoginVerifyPage,
    PhoneupdatePage,
    ForgotPasswordPage,
    RegisterPage,
    RegisterUserPage,
    RegisterCarInfoPage,
    RegisterFacephotoPage,
    RegisterDriverVerifyPage,
    RegisterDriverPrefPage,
    RegisterDriverBankPage,
    RegisterDriverAgreementPage,
    RegisterUserCompletedPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: FormDataService, useClass: FormDataService },
    { provide: RegisterFlowService, useClass: RegisterFlowService },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
