import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverPage } from '../driver';

/**
 * Generated class for the TripcompletedDriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tripcompleted-driver',
  templateUrl: 'tripcompleted-driver.html',
})
export class TripcompletedDriverPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripcompletedDriverPage');
  }

  submit() {
    this.navCtrl.setRoot(DriverPage);
  }
}
