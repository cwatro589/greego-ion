import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RequestcallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestcall',
  templateUrl: 'requestcall.html',
})
export class RequestcallPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestcallPage');
  }

  accept() {
    this.navCtrl.pop();
  }

  reject() {
    this.navCtrl.pop();
  }
}
