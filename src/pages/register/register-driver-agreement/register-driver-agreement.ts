import { Component, Pipe, PipeTransform, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import { RegisterType } from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';

import { RegisterAgreement1Page } from './register-agreement1/register-agreement1';
import { RegisterAgreement2Page } from './register-agreement2/register-agreement2';
import { RegisterAgreement3Page } from './register-agreement3/register-agreement3';
import { RegisterAgreement4Page } from './register-agreement4/register-agreement4';
import { RegisterUserCompletedPage } from '../register-user-completed/register-user-completed';

/**
 * Generated class for the RegisterDriverAgreementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register-driver-agreement',
  templateUrl: 'register-driver-agreement.html',
})

export class RegisterDriverAgreementPage implements OnInit {

  agreementList = [
    {
      name : 'Agreement 1',
      page : 'RegisterAgreement1Page',
      type : 'rider'
    },
    {
      name : 'Agreement 2',
      page : 'RegisterAgreement2Page',
      type : 'rider'
    },
    {
      name : 'Agreement 3',
      page : 'RegisterAgreement3Page',
      type : 'driver'
    },
    {
      name : 'Agreement 4',
      page : 'RegisterAgreement4Page',
      type : 'driver'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl:LoadingController, private formDataService: FormDataService) {
  }

  private registerType: RegisterType;

  ngOnInit() {
      this.registerType = this.formDataService.getType();
  }

  ionViewDidLoad() {
  }

  openModal(a) {
    let modal = this.modalCtrl.create(a);
    modal.present();
  }

  goto() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
    this.formDataService.setType(this.registerType);
    this.navCtrl.push(RegisterUserCompletedPage);
  }
}

@Pipe({
    name: 'matchesCategory'
})

export class MathcesCategoryPipe implements PipeTransform {
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private formDataService: FormDataService) {
  }
  
    transform(item: Array<any>, type): any {
      
      if (type.userType == 'driver') {
        return item;
      }
      else {
        return item.filter(u => u.type == 'rider');
      }
  }
}
