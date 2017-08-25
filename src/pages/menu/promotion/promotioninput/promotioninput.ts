import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private domain:Domain, private formDataService: FormDataService, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotioninputPage');
  }

  applyPromoCode() {
    if(this.promoCode === '') {
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'input promotion code',
        buttons: [
          {
            text: 'OK',
            role: 'OK',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
    }else {
      this.http.post(this.domain.ip + "/api/promo/register", {code : this.promoCode, email : this.formDataService.getPersonal().email}, {})
        .map(res => res.json())
        .subscribe(data => {
          if(data.success) {
            this.navCtrl.pop();
          }else{
            let alert = this.alertCtrl.create({
              title: 'Error',
              message: 'not valid promotion code',
              buttons: [
                {
                  text: 'OK',
                  role: 'OK',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            alert.present();
          }
        })
    }
  }
}
