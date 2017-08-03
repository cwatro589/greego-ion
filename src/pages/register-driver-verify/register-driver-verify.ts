import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverBankPage } from '../register-driver-bank/register-driver-bank';

/**
 * Generated class for the RegisterDriverVerifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-verify',
  templateUrl: 'register-driver-verify.html',
})
export class RegisterDriverVerifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterDriverVerifyPage');
  }

  registerType = this.navParams.data;
  goto() {
    this.navCtrl.push(RegisterDriverBankPage, this.registerType);
  }
}
