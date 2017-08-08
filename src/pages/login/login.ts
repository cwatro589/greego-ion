import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginVerifyPage } from '../login-verify/login-verify';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

import { UserPage } from '../user/user';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  gotoUser() {
    this.navCtrl.setRoot(UserPage);
  }
  gotoLoginVerifyPage() {
    this.navCtrl.push(LoginVerifyPage);
  }
  gotoForgotPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}