/**
 * Created by user on 2017-08-14.
 */

import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverAgreementPage } from '../register-driver-agreement/register-driver-agreement';

import {Address, Birth} from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';

/**
 * Generated class for the RegisterDriverBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-bank',
  templateUrl: 'register-driver-info.html',
})
export class RegisterDriverInfoPage {

  address: Address;
  birth: Birth;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
    this.address = this.formDataService.getAddress();
    this.birth = this.formDataService.getBirth();
  }

  ionViewDidLoad() {
  }

  goto() {
    this.formDataService.setAddress(this.address);
    this.formDataService.setBirth(this.birth);
    this.navCtrl.push(RegisterDriverAgreementPage);
  }
}

