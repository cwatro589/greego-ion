import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { DriverPage } from '../driver/driver';
import {UserPage} from "../user/user";
import {FormDataService} from "../../form/formData.service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, public formDataService: FormDataService) {

  }
  gotoLoginPage() {
    console.log(this.formDataService);
    this.navCtrl.push(LoginPage);
  }
  gotoRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
  gotoDriver() {
    this.navCtrl.setRoot(DriverPage);
  }
  // gotoUser() {
  //   this.navCtrl.setRoot(UserPage);
  // }
}
