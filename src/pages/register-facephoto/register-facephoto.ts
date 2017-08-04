import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterCarInfoPage } from '../register-car-info/register-car-info';
import { RegisterDriverPrefPage } from '../register-driver-pref/register-driver-pref';

import { FacePhoto, RegisterType } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';

/**
 * Generated class for the RegisterFacephotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-facephoto',
  templateUrl: 'register-facephoto.html',
})
export class RegisterFacephotoPage {
  registerType: RegisterType;
  facePhoto: FacePhoto;
  photoSelected:boolean = false;
  form: any;
  valid:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.registerType = this.formDataService.getType();
      this.facePhoto = this.formDataService.getFacePhoto();
  }

  ionViewDidLoad() {
  }

  takephoto() {
    this.facePhoto.facePhotoLocation = '../../assets/1.jpg';
    this.valid = true;
    this.photoSelected = true;
  }
  
  goto() {
    this.formDataService.setFacePhoto(this.facePhoto);
    this.formDataService.setType(this.registerType);
    
    if (this.registerType.userType == 'rider') {
      this.navCtrl.push(RegisterCarInfoPage);
    }
    else {
      this.navCtrl.push(RegisterDriverPrefPage);
    }
  }
}
