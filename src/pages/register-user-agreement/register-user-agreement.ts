import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserCompletedPage } from '../register-user-completed/register-user-completed';
import { LoadingController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserAgreementPage');
  }

  goto(a) {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.navCtrl.push(a);
  }
}