import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestcallPage');
  }

  test:string = "aaa";

  accept() {
    this.viewCtrl.dismiss(true);
  }

  reject() {
    this.viewCtrl.dismiss(false);
  }
}
