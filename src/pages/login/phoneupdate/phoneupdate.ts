import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginVerifyPage } from '../login-verify/login-verify';

/**
 * Generated class for the PhoneupdatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phoneupdate',
  templateUrl: 'phoneupdate.html',
})
export class PhoneupdatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneupdatePage');
  }
  
  gotoLoginVerifyPage() {
    this.navCtrl.push(LoginVerifyPage);
  }
}
