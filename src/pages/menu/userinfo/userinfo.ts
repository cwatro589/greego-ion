import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams} from 'ionic-angular';
import {Bank, Domain, DriverInfo, DriverPref, FacePhoto, Personal, Rider} from "../../../form/formData.model";
import {FormDataService} from "../../../form/formData.service";
import {DriverPage} from "../../driver/driver";
import {Http} from "@angular/http";
import {subscribeOn} from "rxjs/operator/subscribeOn";

/**
 * Generated class for the UserinfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userinfo',
  templateUrl: 'userinfo.html',
  providers: [
    Domain
  ]
})
export class UserinfoPage {

  title = 'User Info';
  personal: Personal;
  carInfo: Rider;
  bank: Bank;
  driver: DriverPref;
  photo: FacePhoto;
  a: string;
  userType: number;

  isLoading: boolean = false;

  years: any = [];
  brands: any = [];
  models: any = [];
  trims: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private http: Http, private domain: Domain, private alertCtrl: AlertController) {
    this.personal = this.formDataService.getPersonal();
    this.photo = this.formDataService.getFacePhoto();
    this.carInfo = this.formDataService.getRider();
    this.userType = navParams.get('lastLoginClass');
    console.log(this.userType);

    if(this.userType === 1) {
      this.carInfo = this.formDataService.getRider();

      this.http.get(this.domain.ip + '/api/car?list=year&query=year')
        .map(res => res.json())
        .subscribe(data => {
          var temp = '';

          for(let i=0;i<data.data.length;i++){
            for(let j=0;j<i;j++){
              if(data.data[i] < data.data[j]) {
                temp = data.data[j];
                data.data[j] = data.data[i];
                data.data[i] = temp;
              }
            }
          }
          this.years = data.data;

          this.getBrand();
          this.getModel();
          this.getTrim();
          this.isLoading = true;
        });
    }else{
      this.driver = this.formDataService.getDriver();
      this.bank = this.formDataService.getBank();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserinfoPage');
  }

  getBrand() {
    this.http.get(this.domain.ip + '/api/car?list=brand&year=' + this.carInfo.carYear)
      .map(res => res.json())
      .subscribe(data => {
        var temp = '';

        for(let i=0;i<data.data.length;i++){
          for(let j=0;j<i;j++){
            if(data.data[i] < data.data[j]) {
              temp = data.data[j];
              data.data[j] = data.data[i];
              data.data[i] = temp;
            }
          }
        }

        this.brands = data.data;

        if(this.isLoading == false){
          this.models = [];
          this.trims = [];
          this.carInfo.carBrand = '';
          this.carInfo.carModel = '';
          this.carInfo.carTrim = '';
        }

        console.log("getBrand");
      })
  }

  getModel() {
    this.http.get(this.domain.ip + '/api/car?list=model&year=' + this.carInfo.carYear + '&brand=' + this.carInfo.carBrand)
      .map(res => res.json())
      .subscribe(data => {
        var temp = '';

        for(let i=0;i<data.data.length;i++){
          for(let j=0;j<i;j++){
            if(data.data[i] < data.data[j]) {
              temp = data.data[j];
              data.data[j] = data.data[i];
              data.data[i] = temp;
            }
          }
        }

        this.models = data.data;

        if(this.isLoading == false) {
          this.trims = [];
          this.carInfo.carModel = '';
          this.carInfo.carTrim = '';
        }
      });
  }

  getTrim() {
    this.http.get(this.domain.ip + '/api/car?list=type&year=' + this.carInfo.carYear + '&brand=' + this.carInfo.carBrand + '&model=' + this.carInfo.carModel)
      .map(res => res.json())
      .subscribe(data => {
        var temp = '';

        for(let i=0;i<data.data.length;i++){
          for(let j=0;j<i;j++){
            if(data.data[i] < data.data[j]) {
              temp = data.data[j];
              data.data[j] = data.data[i];
              data.data[i] = temp;
            }
          }
        }

        this.trims = data.data;
      })
  }

  updateInfo() {
    console.log(this.userType);

    if(this.userType == 1) {
      const json = {
        id : this.formDataService.getPersonal().id,
        phoneNum : this.formDataService.getPersonal().phone,
        email : this.formDataService.getPersonal().email,
        pw : '',
        user : {
          carInfo : {
            year : this.carInfo.carYear,
            brand : this.carInfo.carBrand,
            model : this.carInfo.carModel,
            trim : this.carInfo.carTrim,
            color : this.carInfo.carColor,
            transmission : this.carInfo.carTransmittion
          }
        }
      };

      if(this.personal.password == '') {
        delete json['pw'];
      }

      this.http.put(this.domain.ip + "/api/users/", json, {})
        .map(res => res.json())
        .subscribe(data => {
          if(data.success){
            let alert = this.alertCtrl.create({
              title: 'Success!',
              message: 'User information update successfully',
              buttons: [
                {
                  text: 'OK',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                }
              ]
            });
            alert.present();
          }
        })
    }
  }

  closeModal() {
    this.navCtrl.pop();
    this.isLoading = false;
  }
}
