import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http} from "@angular/http";
import {Domain} from "../../../form/formData.model";
import {FormDataService} from "../../../form/formData.service";
import {PromotioninputPage} from "./promotioninput/promotioninput";

/**
 * Generated class for the PromotionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
  providers: [
    Domain
  ]
})
export class PromotionPage {
  promoLists: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private domain:Domain, private formDataService: FormDataService) {
    console.log(this.formDataService.getPersonal().email);
    this.http.get(domain.ip + "/api/promo/list?email=" + '', {})
      .map(res => res.json())
      .subscribe(data => {
        console.log(data, "promo");
        this.promoLists = data.data;
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  addPromo() {
    this.navCtrl.push(PromotioninputPage);
  }
}
