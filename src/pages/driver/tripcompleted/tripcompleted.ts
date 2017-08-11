import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverPage } from '../driver';
import { CustomersupportPage } from '../../menu/customersupport/customersupport';

import * as $ from 'jquery'

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

  ratings:number = 0;
  ratingAvail:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //Driver Rating - 5 Star
    $('.driverRating i').click( (i)=> {
      $('.driverRating i').removeClass('active');
      $(i.currentTarget).prevAll('i').addBack().addClass('active');
      this.ratings = ($(i.currentTarget).prevAll('i').length + 1);
      if (this.ratings >= 1) {
        this.ratingAvail = true;
      }
      else {
        this.ratingAvail = false;
      }
    });
  }

  submit() {
    this.navCtrl.setRoot(DriverPage);
  }

  customersupport() {
    this.navCtrl.push(CustomersupportPage);
  }

}
