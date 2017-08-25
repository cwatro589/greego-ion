import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormDataService} from "../../../form/formData.service";
import {Http} from "@angular/http";
import {Domain} from "../../../form/formData.model";

/**
 * Generated class for the BillingPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billing',
  templateUrl: 'billing.html',
  providers: [
    Domain
  ]
})
export class BillingPage {

  billingTab:string = 'earned';
  payments:any = [];
  payouts:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private http: Http, private domain: Domain) {
    this.http.post(this.domain.ip + '/api/payment/list', {id : this.formDataService.getPersonal().id})
      .map(res => res.json())
      .subscribe(paymentData => {
        if(paymentData.success){
          this.payments = paymentData.data;
          console.log(this.payments, 'payments');
        }

        this.http.post(this.domain.ip + '/api/payout/list', {id : this.formDataService.getPersonal().id})
          .map(res => res.json())
          .subscribe(payoutData => {
            if(payoutData.success){
              this.payouts = payoutData.data;
              console.log(this.payouts, 'payouts');
              console.log(this.payments, 'payments');
            }
          })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillingPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

}
