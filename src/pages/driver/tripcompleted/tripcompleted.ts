import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverPage } from '../driver';

/**
 * Generated class for the TripcompletedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tripcompleted',
  templateUrl: 'tripcompleted.html',
})
export class TripcompletedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripcompletedPage');
  }

  submit() {
    this.navCtrl.setRoot(DriverPage);
  }

}
