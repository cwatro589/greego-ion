import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverAgreementPage } from '../register-driver-agreement/register-driver-agreement';

import {Domain, Rider} from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';
import {Http} from "@angular/http";
/**
 * Generated class for the RegisterCarInfoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-car-info',
  templateUrl: 'register-car-info.html',
  providers : [
    Domain
  ]
})
export class RegisterCarInfoPage {

  rider: Rider;
  years: any = [];
  brands: any = [];
  models: any = [];
  trims: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService, private http: Http, private domain: Domain) {
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
      })
  }

  ngOnInit() {
      this.rider = this.formDataService.getRider();
  }

  ionViewDidLoad() {
  }

  getBrand() {
    this.http.get(this.domain.ip + '/api/car?list=brand&year=' + this.rider.carYear)
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
        this.models = [];
        this.trims = [];
        this.rider.carBrand = '';
        this.rider.carModel = '';
        this.rider.carTrim = '';
      })
  }

  getModel() {
    this.http.get(this.domain.ip + '/api/car?list=model&year=' + this.rider.carYear + '&brand=' + this.rider.carBrand)
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
        this.trims = [];
        this.rider.carModel = '';
        this.rider.carTrim = '';
      });
  }

  getTrim() {
    this.http.get(this.domain.ip + '/api/car?list=type&year=' + this.rider.carYear + '&brand=' + this.rider.carBrand + '&model=' + this.rider.carModel)
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

  goto() {
      this.formDataService.setRider(this.rider);
      this.navCtrl.push(RegisterDriverAgreementPage);
  }
}
