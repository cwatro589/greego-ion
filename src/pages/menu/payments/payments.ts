import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Domain} from "../../../form/formData.model";
import {FormDataService} from "../../../form/formData.service";
import {AddcreditcardPage} from "./addcreditcard/addcreditcard";

/**
 * Generated class for the PaymentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
  providers: [
    Domain
  ]
})
export class PaymentsPage {

  creditCardList:any;
  changeCreditCard:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController, private formDataService: FormDataService, private domain: Domain) {
    if (navParams.get('changeCC')) {
      this.changeCreditCard = true;
    }
    this.getUserInfo();
  }

  getUserInfo() {
    this.http.post(this.domain.ip + '/api/payment/list', { id : this.formDataService.getPersonal().id })
      .map(res => res.json())
      .subscribe(foundCard => {
        console.log(foundCard.data);
      this.creditCardList = foundCard.data;
      console.log(this.creditCardList);
    },
    err => {
        console.log("Oops!");
    });
  }

  addCardPage() {
    this.navCtrl.push(AddcreditcardPage);
  }

  creditCardIcon(type) {
    switch(type) {
      case "visa":
        return 'fa fa-cc-visa';
      case "mastercard":
        return 'fa fa-cc-mastercard';
      case "discover":
        return 'fa fa-cc-discover';
      case "amex":
        return 'fa fa-cc-amex';
    }
  }

  creditCardName(type) {
    switch(type) {
      case "visa":
        return 'visa';
      case "mastercard":
        return 'master';
      case "discover":
        return 'discover';
      case "amex":
        return 'american express';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentsPage');
  }

  closeModal() {
    this.navCtrl.pop();
  }

  removeCreditCard(selected: any) {
    console.log(selected);
    const json = {
      id : this.formDataService.getPersonal().id,
      last4 : '',
      brand : '',
      exp_year : '',
      exp_month : ''
    };

    for(let i=0;i<this.creditCardList.length;i++){
      console.log(this.creditCardList[i]);
      if(this.creditCardList[i].card == selected){
        json.last4 = this.creditCardList[i].last4;
        json.brand = this.creditCardList[i].brand;
        json.exp_year = this.creditCardList[i].exp_year;
        json.exp_month = this.creditCardList[i].exp_month;
        console.log(json);

        this.http.post(this.domain.ip + '/api/payment/remove', json)
          .map(res => res.json())
          .subscribe(result => {
            if(result.success) {
              const filtered = this.creditCardList.filter((item) => {
                return item.last4 !== json.last4;
              })
              console.log(filtered);
              this.creditCardList = filtered;
            }
          });
        break;
      }
    }

  }

  // setDefault() {
  //   // 크레딧 카드 리스트 중 Default로 설정되는 Function 추가.
  //   alert("1");
  // }
  //
  // selectCreditCard() {
  //   alert("2");
  // }
}
