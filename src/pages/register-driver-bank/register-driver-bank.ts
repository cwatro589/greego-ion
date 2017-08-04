import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverAgreementPage } from '../register-driver-agreement/register-driver-agreement';

import { Bank } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';

/**
 * Generated class for the RegisterDriverBankPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-bank',
  templateUrl: 'register-driver-bank.html',
})
export class RegisterDriverBankPage {

  bank: Bank;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.bank = this.formDataService.getBank();
  }

  ionViewDidLoad() {
  }

  goto() {
    this.formDataService.setBank(this.bank);
    this.navCtrl.push(RegisterDriverAgreementPage);
  }
}
