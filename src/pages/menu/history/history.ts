import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {Domain} from "../../../form/formData.model";

/**
 * Generated class for the HistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  historys: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private domain:Domain) {
    this.http.get(domain.ip + "/api/notice", {})
      .map(res => res.json())
      .subscribe(data => {
        this.historys = data.data;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
