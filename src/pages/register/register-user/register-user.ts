import { Component, OnInit  } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterFacephotoPage } from '../register-facephoto/register-facephoto';

import { Personal }            from '../../../form/formData.model';
import { FormDataService }     from '../../../form/formData.service';

/**
 * Generated class for the RegisterUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html',
})

export class RegisterUserPage implements OnInit {

  personal: Personal;
  Confirm:string;
  passwordMatch:boolean;
  form: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formDataService: FormDataService) {

  }

  passwordValidation() {
    if (this.personal.password == this.Confirm) {
      this.passwordMatch = true;
    }
    else {
      this.passwordMatch = false;
    }
  }

  ngOnInit() {
      this.personal = this.formDataService.getPersonal();
      console.log('Personal feature loaded!');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterUserPage');
  }

  goto() {
    this.formDataService.setPersonal(this.personal);
    this.navCtrl.push(RegisterFacephotoPage);
  }
}
