import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverBankPage } from '../register-driver-bank/register-driver-bank';

import { DriverInfo } from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  providers : [
    Camera
  ]
})
export class RegisterDriverVerifyPage {

  takePhoto:string = 'Take a Photo';
  completed:string = 'Completed';

  driverLicense:boolean = false;
  driverIdentification:boolean = false;
  driverInsurance:boolean = false;
  driverInfo: DriverInfo;

  valid:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private camera:Camera) {
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
    let cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth : 500,
      targetHeight : 500,
      saveToPhotoAlbum : false,
      correctOrientation: true
    };

    this.camera.getPicture(cameraOptions).then((imageData) => {
      console.log(imageData);

      switch (name) {
        case "driverLicense":
          if (this.driverLicense == false) {
            this.driverInfo.driverLicense = imageData;
            this.driverLicense = true;
          }
          break;
        case "driverIdentification":
          if (this.driverIdentification == false) {
            this.driverInfo.driverIdentification = imageData;
            this.driverIdentification = true;
          }
          break;
        case "driverInsurance":
          if (this.driverInsurance == false) {
            this.driverInfo.driverInsurance = imageData;
            this.driverInsurance = true;
          }
          break;
      }
      this.validationCheck();
    });
  }

  goto() {
    this.formDataService.setDriverInfo(this.driverInfo);
    this.navCtrl.push(RegisterDriverBankPage);
  }
}
