import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginVerifyPage } from '../login-verify/login-verify';
import {Http} from "@angular/http";
import {Domain} from "../../../form/formData.model";
import {FormDataService} from "../../../form/formData.service";

/**
 * Generated class for the PhoneupdatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phoneupdate',
  templateUrl: 'phoneupdate.html',
  providers: [
    Domain
  ]
})
export class PhoneupdatePage {
  phone:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private domain: Domain, private formDataService: FormDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhoneupdatePage');
  }

  gotoLoginVerifyPage() {
    const json = {
      email : this.formDataService.getPersonal().email,
      phoneNum : this.phone
    };

    this.http.post(this.domain.ip + "/api/auth/send", json, {})
      .map(res => res.json())
      .subscribe(sendRes => {
        console.log(sendRes, 'sendRes');

        if(sendRes.success){
          this.navCtrl.push(LoginVerifyPage);
        }
      });
  }
}
