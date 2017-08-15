import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PhoneupdatePage } from '../phoneupdate/phoneupdate';
import {Http} from "@angular/http";
import {Domain} from "../../../form/formData.model";
import {DriverPage} from "../../driver/driver";
import {FormDataService} from "../../../form/formData.service";

/**
 * Generated class for the LoginVerifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-verify',
  templateUrl: 'login-verify.html',
  providers: [
    Domain
  ]
})
export class LoginVerifyPage {
  code: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, private domain: Domain, private formDataService: FormDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginVerifyPage');
  }

  gotoPhoneupdatePage() {
    this.navCtrl.push(PhoneupdatePage);
  }

  verifyCode(){
    const json = {
      email : this.formDataService.getPersonal().email,
      phoneNum : this.formDataService.getPersonal().phone,
      code : this.code
    };
    console.log(json);
    this.http.post(this.domain.ip + "/api/users/test", {email : 'hbc8141@naver.com'}, {})
      .map(res => res.json())
      .subscribe(loginRes => {
        console.log(loginRes);
        this.navCtrl.setRoot(DriverPage, {
          data : loginRes
        });
      })
    // this.http.post(this.domain.ip + "/api/auth/verify", json, {})
    //   .map(res => res.json())
    //   .subscribe(verifyRes => {
    //     if(verifyRes.success) {
    //       const json = {
    //         email : this.formDataService.getPersonal().email,
    //         codeVerify : true,
    //         userVerify : true
    //       };
    //
    //       this.http.post(this.domain.ip + "/api/auth/login", json, {})
    //         .map(res => res.json())
    //         .subscribe(loginRes => {
    //           if(loginRes.success) {
    //             this.navCtrl.setRoot(DriverPage, {
    //               data : loginRes
    //             });
    //           }
    //         })
    //     }
    //   });
  }
}
