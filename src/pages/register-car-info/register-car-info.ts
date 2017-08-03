import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterDriverAgreementPage } from '../register-driver-agreement/register-driver-agreement';

import { Rider } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';
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
})
export class RegisterCarInfoPage {

  rider: Rider;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.rider = this.formDataService.getRider();
  }

  ionViewDidLoad() {
  }

  goto() {
      this.formDataService.setRider(this.rider);
      this.navCtrl.push(RegisterDriverAgreementPage);
  }
}
