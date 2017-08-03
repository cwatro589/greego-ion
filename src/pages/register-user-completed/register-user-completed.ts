import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

import { FacePhoto, RegisterType } from '../../form/formData.model';
import { FormDataService } from '../../form/formData.service';

/**
 * Generated class for the RegisterUserCompletedPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user-completed',
  templateUrl: 'register-user-completed.html',
})
export class RegisterUserCompletedPage {
  registerType: RegisterType;
  regtype: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {
  }

  ngOnInit() {
      this.registerType = this.formDataService.getType();
      this.regtype = this.registerType.userType;
      debugger;
  }

  ionViewDidLoad() {
  }
  goto(a) {
    this.formDataService.setType(this.registerType);
    this.navCtrl.push(a);
  }
}
