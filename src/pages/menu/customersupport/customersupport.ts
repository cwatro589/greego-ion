import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MessagesentPage} from "./messagesent/messagesent";

/**
 * Generated class for the CustomersupportPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-customersupport',
  templateUrl: 'customersupport.html',
})
export class CustomersupportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomersupportPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  send() {
    this.navCtrl.push(MessagesentPage);
  }
}
