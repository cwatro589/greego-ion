import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DriverPage } from '../driver';

import * as $ from 'jquery'
import {Http} from "@angular/http";

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

  ratings:number = 0;
  ratingAvail:boolean = false;
  list:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http) {
    this.list = navParams.get('list');
  }

  ionViewDidLoad() {
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
}
