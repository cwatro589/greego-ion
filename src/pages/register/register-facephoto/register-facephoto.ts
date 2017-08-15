import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterCarInfoPage } from '../register-car-info/register-car-info';
import { RegisterDriverPrefPage } from '../register-driver-pref/register-driver-pref';

import {Domain, FacePhoto, RegisterType} from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {Http} from "@angular/http";

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
  providers: [
    Camera,
    Transfer,
    Domain
  ]
})
export class RegisterFacephotoPage {
  registerType: RegisterType;
  facePhoto: FacePhoto;
  photoSelected:boolean = true;
  form: any;
  valid:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private domain: Domain, private http: Http, private transfer: Transfer, private camera:Camera) {
  }

  ngOnInit() {
      this.registerType = this.formDataService.getType();
      this.facePhoto = this.formDataService.getFacePhoto();
  }

  ionViewDidLoad() {
  }

  takephoto(type:string) {
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

    if(type === 'gallery') {
      cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    this.camera.getPicture(cameraOptions).then((imageData) => {
      this.facePhoto.facePhotoLocation = imageData;
      this.valid = true;
      this.photoSelected = true;
      console.log(imageData);
    }, (err) => {
      console.log("photo error");
    })
  }

  goto() {
    console.log(this.facePhoto);
    this.formDataService.setFacePhoto(this.facePhoto);
    this.formDataService.setType(this.registerType);

    console.log(this.formDataService.getFacePhoto());
    if (this.registerType.userType == 'rider') {
      this.navCtrl.push(RegisterCarInfoPage);
    }
    else {
      this.navCtrl.push(RegisterDriverPrefPage);
    }
  }
}
