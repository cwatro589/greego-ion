import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterUserPage } from '../register-user/register-user';
import { RegisterDriverVerifyPage } from '../register-driver-verify/register-driver-verify';

import { RegisterType } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})

export class RegisterPage implements OnInit {
  registerType: RegisterType;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private formDataService: FormDataService) {

  }
  ngOnInit() {
      this.registerType = this.formDataService.getType();
  }

  ionViewDidLoad() {
  }

  goto(type) {
    this.registerType.userType = type;
    this.formDataService.setType(this.registerType);
    this.navCtrl.push(RegisterUserPage);
  }
}