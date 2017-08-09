import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhoneupdatePage } from '../phoneupdate/phoneupdate';

/**
 * Generated class for the LoginVerifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-verify',
  templateUrl: 'login-verify.html',
})
export class LoginVerifyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginVerifyPage');
  }
  
  gotoPhoneupdatePage() {
    this.navCtrl.push(PhoneupdatePage);
  }
}
