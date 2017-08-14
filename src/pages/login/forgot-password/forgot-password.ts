import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login';
import {Http} from "@angular/http";
import {Domain} from "../../../form/formData.model";

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers: [
    Domain
  ]
})
export class ForgotPasswordPage {
  email: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private domain: Domain) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  gotoLoginPage() {
    this.http.post(this.domain.ip + '/api/users/forgot', { email : this.email}, {})
      .map(res => res.json())
      .subscribe(result => {
        if(result.success){
          this.navCtrl.push(LoginPage);
        }
      });
  }
}
