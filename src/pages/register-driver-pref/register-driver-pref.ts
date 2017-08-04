import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverVerifyPage } from '../register-driver-verify/register-driver-verify';

import { DriverPref }            from '../../form/formData.model';
import { FormDataService }     from '../../form/formData.service';
/**
 * Generated class for the RegisterDriverPrefPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-pref',
  templateUrl: 'register-driver-pref.html',
})
export class RegisterDriverPrefPage implements OnInit {

  driverPref: DriverPref;
  form: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.driverPref = this.formDataService.getDriver();
  }

  ionViewDidLoad() {
  }

  goto() {
    this.formDataService.setDriver(this.driverPref);
    this.navCtrl.push(RegisterDriverVerifyPage);
  }
}
