import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverVerifyPage } from '../register-driver-verify/register-driver-verify';

/**
 * Generated class for the RegisterDriverPrefPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-pref',
  templateUrl: 'register-driver-pref.html',
})
export class RegisterDriverPrefPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterDriverPrefPage');
  }
  registerType = this.navParams.data;
  goto() {
    this.navCtrl.push(RegisterDriverVerifyPage, this.registerType);
  }
}
