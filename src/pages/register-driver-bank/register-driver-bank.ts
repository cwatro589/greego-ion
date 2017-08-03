import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverAgreementPage } from '../register-driver-agreement/register-driver-agreement';

/**
 * Generated class for the RegisterDriverBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-bank',
  templateUrl: 'register-driver-bank.html',
})
export class RegisterDriverBankPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterDriverBankPage');
  }

  registerType = this.navParams.data;
  goto() {
    this.navCtrl.push(RegisterDriverAgreementPage, this.registerType);
  }
}
