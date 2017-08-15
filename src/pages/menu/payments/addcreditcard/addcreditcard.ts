import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Card, Domain} from "../../../../form/formData.model";
import {Http} from "@angular/http";
import {FormDataService} from "../../../../form/formData.service";

/**
 * Generated class for the AddcreditcardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcreditcard',
  templateUrl: 'addcreditcard.html',
  providers: [
    Domain
  ]
})
export class AddcreditcardPage {
  card:Card;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private http: Http, private domain: Domain) {
    this.card = this.formDataService.getCard();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcreditcardPage');
  }

  registerCard() {
    const json = {
      id : this.formDataService.getPersonal().id,
      fName : this.formDataService.getPersonal().firstName,
      lName : this.formDataService.getPersonal().lastName,
      email : this.formDataService.getPersonal().email,
      card : this.card.cardNum,
      exp_year : this.card.cardYear,
      exp_month : this.card.cardMonth,
      cvc : this.card.cardCvc
    };

    this.http.post(this.domain.ip + '/api/payment/register', json, {})
      .map(res => res.json())
      .subscribe(cardAddRes => {
        this.formDataService.setCard(this.card);
        this.navCtrl.pop();
      })
  }
}
