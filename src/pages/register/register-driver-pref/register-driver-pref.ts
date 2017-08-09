import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverVerifyPage } from '../register-driver-verify/register-driver-verify';

import { DriverPref }            from '../../../form/formData.model';
import { FormDataService }     from '../../../form/formData.service';
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
  valid:boolean = false;
  form: any;

  // typeofcar = [
  //   {
  //     name : 'Sedan',
  //     model : this.driverPref.availCarTypeSedan,
  //     value : false
  //   },
  //   {
  //     name : 'SUV',
  //     model : this.driverPref.availCarTypeSuv,
  //     value : false
  //   },
  //   {
  //     name : 'Van',
  //     model : this.driverPref.availCarTypeVan,
  //     value : false
  //   }
  // ];

  // typeoftransmittion = [
  //   {
  //     name : 'Automatic',
  //     model : this.driverPref.availCarTransmissionAuto,
  //     value : false
  //   },
  //   {
  //     name : 'Manual',
  //     model : this.driverPref.availCarTransmissionManual',
  //     value : false
  //   }
  // ];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  validationCheck() {
    if ((this.driverPref.availCarTypeSedan || this.driverPref.availCarTypeSuv || this.driverPref.availCarTypeVan) && (this.driverPref.availCarTransmissionAuto || this.driverPref.availCarTransmissionManual)) {
      return this.valid = true;
    }
    else {
      return this.valid = false;
    }
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
  
  public trackByIndex(index: number, item) {
    return index;
  }
}