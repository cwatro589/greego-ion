import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverBankPage } from '../register-driver-bank/register-driver-bank';

import { DriverInfo } from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';

/**
 * Generated class for the RegisterDriverVerifyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-verify',
  templateUrl: 'register-driver-verify.html',
})
export class RegisterDriverVerifyPage {

  takePhoto:string = 'Take a Photo';
  completed:string = 'Completed';

  driverLicense:boolean = false;
  driverIdentification:boolean = false;
  driverInsurance:boolean = false;
  driverInfo: DriverInfo;

  valid:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.driverInfo = this.formDataService.getDriverInfo();
  }

  ionViewDidLoad() {
  }
  
  validationCheck() {
    if (this.driverLicense && this.driverIdentification && this.driverInsurance) {
      this.valid = true;
    }
    else {
      this.valid = false;
    }
  }

  uploadPicture(valid, target, text) {
    if (valid == false) {
      target = target;
      valid = true;
    }
    else {
      target = undefined;
      valid = false;
    }
  }

  selectPicture(name) {
    switch (name) {
      case "driverLicense":
        if (this.driverLicense == false) {
          this.driverInfo.driverLicense = 'photo1';
          this.driverLicense = true;
        }
        else {
          this.driverInfo.driverLicense = undefined;
          this.driverLicense = false;
        }
        break;
      case "driverIdentification":
        if (this.driverIdentification == false) {
          this.driverInfo.driverIdentification = 'photo2';
          this.driverIdentification = true;
        }
        else {
          this.driverInfo.driverIdentification = undefined;
          this.driverIdentification = false;
        }
        break;
      case "driverInsurance":
        if (this.driverInsurance == false) {
          this.driverInfo.driverInsurance = 'photo3';
          this.driverInsurance = true;
        }
        else {
          this.driverInfo.driverInsurance = undefined;
          this.driverInsurance = false;
        }
        
        break;
    }
    this.validationCheck();
  }

  goto() {
    this.formDataService.setDriverInfo(this.driverInfo);
    this.navCtrl.push(RegisterDriverBankPage);
  }
}
