import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { DriverPage } from '../driver/driver';
import { AndroidPermissions } from '@ionic-native/android-permissions'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[
    AndroidPermissions
  ]
})

export class HomePage {

  constructor(public navCtrl: NavController, private platform: Platform, private androidPermissions: AndroidPermissions) {
    if(this.platform.is('android')){
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
        .then(
          success => {
            console.log('Permission granted');
        }, err => {
          this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
          })

      this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION]);
    }
  }
  gotoLoginPage() {
    this.navCtrl.push(LoginPage);
  }
  gotoRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }
  gotoDriver() {
    this.navCtrl.setRoot(DriverPage);
  }
}
