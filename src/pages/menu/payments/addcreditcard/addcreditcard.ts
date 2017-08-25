import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
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
  callback:any;
  checked:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private http: Http, private domain: Domain, private alertCtrl: AlertController) {
    this.card = this.formDataService.getCard();
    this.callback = this.navParams.get("callback");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddcreditcardPage');
  }

  checkbox() {
    this.checked = !this.checked;
    console.log(this.checked);
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
      cvc : this.card.cardCvc,
      default : this.checked
    };

    if(this.navParams.get("cardCount") === 0){
      json.default = true;
    }

    this.http.post(this.domain.ip + '/api/payment/register', json, {})
      .map(res => res.json())
      .subscribe(cardAddRes => {
        if(!cardAddRes.success) {
          let alert = this.alertCtrl.create({
            title: 'Error',
            message: cardAddRes.message,
            buttons: [
              {
                text: 'OK',
                role: 'OK'
              }
            ]
          });
          alert.present();
        }else{
          // this.formDataService.setCard(this.card);
          const cardInfo = cardAddRes.data;
          cardInfo.default = json.default;

          this.callback(cardInfo).then(() => {
            this.navCtrl.pop();
          })
        }
      })
  }
}
