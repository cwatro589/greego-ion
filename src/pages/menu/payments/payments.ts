import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

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
})
export class PaymentsPage {

  creditCardList:any;
  changeCreditCard:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController) {
    if (navParams.get('changeCC')) {
      this.changeCreditCard = true;
    }
    this.getUserInfo();
  }

  getUserInfo() {
    this.http.get('http://localhost:8100/assets/usersample.json').map(res => res.json()).subscribe(data => {
      this.creditCardList = data.creditCard;
    },
    err => {
        console.log("Oops!");
    }); 
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

  setDefault() {
    // 크레딧 카드 리스트 중 Default로 설정되는 Function 추가.
    alert("1");
  }

  selectCreditCard() {
    alert("2");
  }

}
