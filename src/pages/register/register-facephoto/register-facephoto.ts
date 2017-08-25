import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterCarInfoPage } from '../register-car-info/register-car-info';
import { RegisterDriverPrefPage } from '../register-driver-pref/register-driver-pref';

import { FacePhoto, RegisterType } from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    Camera
  ]
})
export class RegisterFacephotoPage {
  registerType: RegisterType;
  facePhoto: FacePhoto;
  photoSelected:boolean = false;
  form: any;
  valid:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private camera:Camera) {
  }

  ngOnInit() {
      this.registerType = this.formDataService.getType();
      this.facePhoto = this.formDataService.getFacePhoto();
  }

  ionViewDidLoad() {
  }

  takephoto(type:string) {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth : 1024,
      targetHeight : 1024,
      correctOrientation: true
    }
    if(type === 'gallery') {
      options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
    }

    this.camera.getPicture(options).then((imageData) => {
      this.facePhoto.facePhotoLocation = imageData;
      this.valid = true;
      this.photoSelected = true;
      console.log(imageData);
    }, (err) => {
      console.log("photo error");
    })

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
