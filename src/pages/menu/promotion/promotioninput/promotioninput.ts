import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Domain} from "../../../../form/formData.model";
import {Http} from "@angular/http";
import {FormDataService} from "../../../../form/formData.service";

/**
 * Generated class for the PromotioninputPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotioninput',
  templateUrl: 'promotioninput.html',
  providers: [
    Domain
  ]
})
export class PromotioninputPage {
  promoCode: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private domain:Domain, private formDataService: FormDataService) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotioninputPage');
  }

  applyPromoCode() {
    this.http.post(this.domain.ip + "/api/promo/register", {code : this.promoCode, email : ''}, {})
      .map(res => res.json())
      .subscribe(data => {
        if(data.success) {
          this.navCtrl.pop();
        }
      })
  }
}
