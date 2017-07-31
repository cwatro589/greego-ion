import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserCompletedPage } from '../register-user-completed/register-user-completed';

/**
 * Generated class for the RegisterUserAgreementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user-agreement',
  templateUrl: 'register-user-agreement.html',
})
export class RegisterUserAgreementPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserAgreementPage');
  }

  goto(a) {
    this.navCtrl.push(a);
  }
}
