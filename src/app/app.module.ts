import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FormsModule } from '@angular/forms';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LoginVerifyPage } from '../pages/login/login-verify/login-verify';
import { PhoneupdatePage } from '../pages/login/phoneupdate/phoneupdate';
import { ForgotPasswordPage } from '../pages/login/forgot-password/forgot-password';
import { RegisterPage } from '../pages/register/register';
import { RegisterUserPage } from '../pages/register/register-user/register-user';
import { RegisterCarInfoPage } from '../pages/register/register-car-info/register-car-info';
import { RegisterFacephotoPage } from '../pages/register/register-facephoto/register-facephoto';
import { RegisterDriverVerifyPage } from '../pages/register/register-driver-verify/register-driver-verify';
import { RegisterDriverPrefPage } from '../pages/register/register-driver-pref/register-driver-pref';
import { RegisterDriverBankPage } from '../pages/register/register-driver-bank/register-driver-bank';
import { RegisterDriverAgreementPage, MathcesCategoryPipe } from '../pages/register/register-driver-agreement/register-driver-agreement';
import { RegisterUserCompletedPage } from '../pages/register/register-user-completed/register-user-completed';

import { UserPage } from '../pages/user/user';
import { DriverPage } from '../pages/driver/driver';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FormDataService }    from '../form/formData.service';
import { RegisterFlowService }    from '../registerFlow/registerFlow.service';
import { EqualValidator } from './directives/equal-validator';
import { IonicStorageModule } from '@ionic/storage';


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
    MathcesCategoryPipe,
    EqualValidator,
    UserPage,
    DriverPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FormsModule,
    IonicStorageModule.forRoot()
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
    RegisterUserCompletedPage,
    UserPage,
    DriverPage
  ],
  providers: [
    StatusBar,
    GoogleMaps,
    SplashScreen,
    Geolocation,
    { provide: FormDataService, useClass: FormDataService },
    { provide: RegisterFlowService, useClass: RegisterFlowService },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
