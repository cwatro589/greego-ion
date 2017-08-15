import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginVerifyPage } from './login-verify/login-verify';
import { ForgotPasswordPage } from './forgot-password/forgot-password';

import { UserPage } from '../user/user';
import {Http} from "@angular/http";
import {Domain, Personal} from "../../form/formData.model";
import {FormDataService} from "../../form/formData.service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    Domain
  ]
})
export class LoginPage {
  email: string;
  pw: string;
  personal:Personal;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public domain: Domain, private formDataService: FormDataService) {
    this.personal = this.formDataService.getPersonal();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  gotoUser() {
    this.navCtrl.setRoot(UserPage);
  }
  gotoLoginVerifyPage() {
    const json = {
      email : this.email,
      pw : this.pw
    };

    this.navCtrl.push(LoginVerifyPage, {
      email : this.email,
      phoneNum : '7033801716'
    });

    // this.http.post(this.domain.ip + "/api/auth/compare", json, {})
    //   .map(res => res.json())
    //   .subscribe(compareRes => {
    //       console.log(compareRes, 'data');
    //       if(compareRes.success) {
    //         const json = {
    //           email : this.email,
    //           phoneNum : compareRes.data
    //         };
    //         console.log(json, 'ok');
    //         this.http.post(this.domain.ip + "/api/auth/send", json, {})
    //           .map(res => res.json())
    //           .subscribe(sendRes => {
    //             console.log(sendRes, 'sendRes');
    //             if(sendRes.success){
    //               this.personal.email = this.email;
    //               this.personal.phone = json.phoneNum;
    //               this.formDataService.setPersonal(this.personal);
    //               this.navCtrl.push(LoginVerifyPage);
    //             }
    //           })
    //       }
    //     })
  }
  gotoForgotPasswordPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }
}
