import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterCarInfoPage } from '../register-car-info/register-car-info';
import { RegisterDriverPrefPage } from '../register-driver-pref/register-driver-pref';

<<<<<<< HEAD:src/pages/register/register-facephoto/register-facephoto.ts
import { FacePhoto, RegisterType } from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';
=======
import { FacePhoto, RegisterType } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
>>>>>>> 925c6b4a9b68c155f081199b648c942b1d0d9fd1:src/pages/register-facephoto/register-facephoto.ts

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
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth : 1024,
      targetHeight : 1024,
      correctOrientation: true
    }
    if(type === 'camera') {
      this.camera.getPicture(options).then((imageData) => {
        this.facePhoto.facePhotoLocation = 'data:image/jpeg;base64,' + imageData;
        this.valid = true;
        this.photoSelected = true;
      }, (err) => {
        console.log("photo error");
      })
    }else if(type === 'gallery'){
      options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;

      this.camera.getPicture(options).then((imageData) => {
        this.facePhoto.facePhotoLocation = 'data:image/jpeg;base64,' + imageData;
        this.valid = true;
        this.photoSelected = true;
      }, (err) => {
        console.log("photo error");
      })
    }

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
