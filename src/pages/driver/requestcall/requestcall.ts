import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Http} from "@angular/http";
import {FormDataService} from "../../../form/formData.service";
import {Domain} from "../../../form/formData.model";
import {GoogleMaps} from "@ionic-native/google-maps";

/**
 * Generated class for the RequestcallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-requestcall',
  templateUrl: 'requestcall.html',
  providers:[
    Domain
  ]
})
export class RequestcallPage {

  userInfo:any = '';
  // map: any ='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private googleMaps: GoogleMaps, private domain:Domain, private formDateService: FormDataService, private http: Http) {
    this.userInfo = this.navParams.get('info').msg;
    console.log(this.userInfo, 'userinfo123');
    // console.log(this.userInfo.msg, 'msg');
    // this.map = this.formDateService.getMap();
    this.formDateService.getMap().setClickable(false);
    console.log("constructor");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestcallPage');
  }

  test:string = "aaa";

  accept() {
    this.formDateService.getSocket().emit("tripAccept", {
      tripId : this.userInfo.tripId,
      user : {
        socketId : this.userInfo.user.socketId,
        userId : this.userInfo.user.id,
        source : this.userInfo.source,
        destination : this.userInfo.destination
      },
      driver : {
        id : this.formDateService.getPersonal().id,
        socketId : this.formDateService.getSocketId(),
        fName : this.formDateService.getPersonal().firstName,
        lName : this.formDateService.getPersonal().lastName,
        image : this.formDateService.getFacePhoto().facePhotoLocation,
        phoneNum : this.formDateService.getPersonal().phone,
        grade : this.formDateService.getPersonal().driverGrade
      }
    });
  }

  reject() {
    console.log(this.formDateService.getPersonal(), "personal2");
    this.formDateService.getSocket().emit("tripReject", {
      tripId : this.userInfo.tripId,
      driver : {
        id : this.formDateService.getPersonal().id,
        fName : this.formDateService.getPersonal().firstName,
        lName : this.formDateService.getPersonal().lastName,
        image : this.formDateService.getFacePhoto().facePhotoLocation,
        phoneNum : this.formDateService.getPersonal().phone,
        grade : this.formDateService.getPersonal().driverGrade
      }
    });
  }
}
