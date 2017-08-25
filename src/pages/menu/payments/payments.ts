import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Domain} from "../../../form/formData.model";
import {FormDataService} from "../../../form/formData.service";
import {AddcreditcardPage} from "./addcreditcard/addcreditcard";
import {areIterablesEqual} from "@angular/core/src/change_detection/change_detection_util";

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

  callbackFunction = (_params) => {
    return new Promise((resolve, reject) => {
      console.log(_params, 'params');

      // if(this.creditCardList.length > 0)

      // if(_params.default === true) {
      //   for(let i=0;i<this.creditCardList.length;i++) {
      //     if(this.creditCardList[i].default === true){
      //
      //       document.getElementsByTagName("ion-radio")[i].attributes[1].value = "false";
      //       document.getElementsByTagName("ion-radio")[i].attributes[2].value = "false";
      //
      //       this.creditCardList[i].default = false;
      //       break;
      //     }
      //   }
      // }

      this.creditCardList.push(_params);
      console.log(this.creditCardList, 'params');
      resolve();
    });
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public viewCtrl: ViewController, private formDataService: FormDataService, private domain: Domain, private alertCtrl: AlertController) {
    this.creditCardList = navParams.get("cardList");
    console.log(this.creditCardList, "A");

    if (navParams.get('changeCC')) {
      this.changeCreditCard = true;
    }
  }

  addCardPage() {
    this.navCtrl.push(AddcreditcardPage, {
      callback : this.callbackFunction,
      cardCount : this.creditCardList.length
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
    const json = {
      id : this.formDataService.getPersonal().id,
      list : this.creditCardList
    };

    this.http.post(this.domain.ip + '/api/payment/update', json)
      .map(res => res.json())
      .subscribe(result => {
        console.log(result);
        for(let i=0;i<this.creditCardList.length;i++) {
          if(this.creditCardList[i].default === true){
            this.creditCardList[i].default = false;
            break;
          }
        }

        this.viewCtrl.dismiss(this.creditCardList);
      });
  }

  removeCreditCard(selected: any) {
    if(this.creditCardList.length > 1) {
      for(let i=0;i<this.creditCardList.length;i++) {
        console.log(this.creditCardList[i]);
        if (this.creditCardList[i].last4 == selected) {
          this.creditCardList.splice(i, 1);
          break;
        }
      }
    }else{
      let alert = this.alertCtrl.create({
        title: 'Error',
        message: 'You can\'t delete the default card',
        buttons: [
          {
            text: 'OK',
            role: 'OK'
          }
        ]
      });
      alert.present();
    }

    console.log(this.creditCardList);
  }

  setDefault() {
    // 크레딧 카드 리스트 중 Default로 설정되는 Function 추가.
    alert("1");

  }

  selectCreditCard(selected:any) {
    for(let i=0;i<this.creditCardList.length;i++) {
      if (this.creditCardList[i].default == true) {
        this.creditCardList[i].default = false;
        break;
      }
    }
    // 기본 카드 초기화

    for(let i=0;i<this.creditCardList.length;i++) {
      if (this.creditCardList[i].last4 == selected) {
        this.creditCardList[i].default = true;
        break;
      }
    } // 기본 카드 설정
  }

}
