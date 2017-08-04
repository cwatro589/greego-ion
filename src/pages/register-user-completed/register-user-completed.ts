import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { Personal, FacePhoto, RegisterType, Rider, DriverPref, Bank, DriverInfo } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';

/**
 * Generated class for the RegisterUserCompletedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user-completed',
  templateUrl: 'register-user-completed.html',
})

export class RegisterUserCompletedPage {
  registerType: RegisterType;
  personal: Personal;
  facePhoto: FacePhoto;
  rider: Rider;
  driverInfo: DriverInfo;
  driverPref: DriverPref;
  bank: Bank;

  regtype: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.registerType = this.formDataService.getType();
      this.personal = this.formDataService.getPersonal();
      this.facePhoto = this.formDataService.getFacePhoto();
      this.rider = this.formDataService.getRider();
      this.driverInfo = this.formDataService.getDriverInfo();
      this.driverPref = this.formDataService.getDriver();
      this.bank = this.formDataService.getBank();
      this.regtype = this.registerType.userType;

      console.log(this.formDataService);
  }

  ionViewDidLoad() {
  }

  goto() {
    this.formDataService.setType(this.registerType);
    this.navCtrl.push(LoginPage);
  }
}
