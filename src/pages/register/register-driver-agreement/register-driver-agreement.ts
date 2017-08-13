import { Component, Pipe, PipeTransform, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ModalController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

import {Domain, RegisterType} from '../../../form/formData.model';
import { FormDataService } from '../../../form/formData.service';

import { RegisterAgreement1Page } from './register-agreement1/register-agreement1';
import { RegisterAgreement2Page } from './register-agreement2/register-agreement2';
import { RegisterAgreement3Page } from './register-agreement3/register-agreement3';
import { RegisterAgreement4Page } from './register-agreement4/register-agreement4';
import { RegisterUserCompletedPage } from '../register-user-completed/register-user-completed';
import {Http} from "@angular/http";
import {Transfer, TransferObject} from "@ionic-native/transfer";

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
  providers : [
    Transfer,
    Domain
  ]
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loadingCtrl:LoadingController, private formDataService: FormDataService, private http: Http, private transfer: Transfer, private domain: Domain) {
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
    // let loader = this.loadingCtrl.create({
    //   content: "Please wait...",
    //   duration: 3000
    // });
    // loader.present();
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    if(this.formDataService.getType().userType === 'rider') {
      this.http.post(this.domain.ip + '/api/users/publish', {'email' : this.formDataService.getPersonal().email}, {})
        .map(res => res.json())
        .subscribe(publishRes => {
          const fileTransfer: TransferObject = this.transfer.create();

          const lastIndex = this.formDataService.getFacePhoto().facePhotoLocation.lastIndexOf('/');
          const fileName = this.formDataService.getFacePhoto().facePhotoLocation.substring(lastIndex + 1, this.formDataService.getFacePhoto().facePhotoLocation.length);
          const options = {
            filekey : "file",
            fileName : fileName,
            chunkedMode: false,
            // mimeType : 'multipart/form-data',
            mimeType : 'image/jpg',
            params : {
              'id' : publishRes.data.id,
              'class' : 'user',
              'behavior' : 'save',
              'filename' : 'photo'
            }
          };
          fileTransfer.upload(this.formDataService.getFacePhoto().facePhotoLocation, this.domain.ip + '/api/users/photo', options)
            .then((uploadRes) => {
              let json = {
                id : publishRes.data.id,
                phoneNum : this.formDataService.getPersonal().phone,
                fName : this.formDataService.getPersonal().firstName,
                lName : this.formDataService.getPersonal().lastName,
                email : this.formDataService.getPersonal().email,
                pw : this.formDataService.getPersonal().password,
                image : '/photo/' + publishRes.data.id + '/photo.jpg',
                user : {
                  carInfo : {
                    transmission : this.formDataService.getRider().carTransmittion,
                    sizeOfCar : this.formDataService.getRider().carTrim,
                    brand : this.formDataService.getRider().carBrand,
                    model : this.formDataService.getRider().carModel,
                    color : this.formDataService.getRider().carColor
                  }
                }
              };

              this.http.post(this.domain.ip + '/api/users/register', json, {})
                .map(res => res.json())
                .subscribe(
                  result => {
                    console.log(result);

                    loader.dismiss();

                    if(result.success == true) {
                      this.formDataService.setType(this.registerType);
                      this.navCtrl.push(RegisterUserCompletedPage);
                    }
                  }
                );

              console.log(uploadRes, 'uploadRes');
            }, (err) => {
              console.log(err, 'uploadRes');
            })
        })
    }else{
      this.http.post(this.domain.ip + '/api/users/publish', {'email' : this.formDataService.getPersonal().email}, {})
        .map(res => res.json())
        .subscribe(publishRes => {
          const license = this.formDataService.getDriverInfo().driverLicense;
          const cert = this.formDataService.getDriverInfo().driverIdentification;
          const insurance = this.formDataService.getDriverInfo().driverInsurance;

          let lastIndex = license.lastIndexOf('/');
          let fileName = license.substring(lastIndex + 1, license.length);
          const fileTransfer: TransferObject = this.transfer.create();

          let options = {
            filekey : "file",
            fileName : fileName,
            chunkedMode: false,
            // mimeType : 'multipart/form-data',
            mimeType : 'image/jpg',
            params : {
              'id' : publishRes.data.id,
              'class' : 'driver',
              'behavior' : 'save',
              'filename' : 'license'
            }
          };
          fileTransfer.upload(this.formDataService.getFacePhoto().facePhotoLocation, this.domain.ip + '/api/users/photo', options)
            .then((uploadLicense) => {
              lastIndex = cert.lastIndexOf('/');
              fileName = cert.substring(lastIndex + 1, cert.length);
              options.fileName = fileName;
              options.params.filename = 'cert';

              fileTransfer.upload(this.formDataService.getFacePhoto().facePhotoLocation, this.domain.ip + '/api/users/photo', options)
                .then((uploadCert) => {
                  lastIndex = insurance.lastIndexOf('/');
                  fileName = insurance.substring(lastIndex + 1, insurance.length);
                  options.fileName = fileName;
                  options.params.filename = 'insurance';

                  fileTransfer.upload(this.formDataService.getFacePhoto().facePhotoLocation, this.domain.ip + '/api/users/photo', options)
                    .then((uploadIns) => {
                      const availableTrans = [];
                      const availableSizeOfCar = [];

                      if(this.formDataService.getDriver().availCarTransmissionAuto){
                        availableTrans.push('Automatic');
                      }
                      if(this.formDataService.getDriver().availCarTransmissionManual){
                        availableTrans.push('Manual');
                      }
                      if(this.formDataService.getDriver().availCarTypeSedan) {
                        availableSizeOfCar.push('Sedan');
                      }
                      if(this.formDataService.getDriver().availCarTypeSuv) {
                        availableSizeOfCar.push('SUV');
                      }
                      if(this.formDataService.getDriver().availCarTypeVan) {
                        availableSizeOfCar.push('Van');
                      }

                      let json = {
                        id : publishRes.data.id,
                        phoneNum : this.formDataService.getPersonal().phone,
                        fName : this.formDataService.getPersonal().firstName,
                        lName : this.formDataService.getPersonal().lastName,
                        email : this.formDataService.getPersonal().email,
                        pw : this.formDataService.getPersonal().password,
                        image : '/photo/' + publishRes.data.id + '/photo.jpg',
                        driver: {
                          available : {
                            transmission : availableTrans,
                            sizeOfCar : availableSizeOfCar
                          },
                          ssn : this.formDataService.getBank().ssn,
                          documentsUrl : {
                            license : '/photo/' + publishRes.data.id + '/license.jpg',
                            cert : '/photo/' + publishRes.data.id + '/cert.jpg',
                            insurance : '/photo/' + publishRes.data.id + '/insurance.jpg',
                          }
                        }
                      };

                      console.log(json);

                      this.http.post(this.domain.ip + '/api/users/register', json, {})
                        .map(res => res.json())
                        .subscribe(
                          result => {
                            console.log(result);

                            if(result.success == true) {
                              let json = {
                                id : publishRes.data.id,
                                fName : this.formDataService.getPersonal().firstName,
                                lName : this.formDataService.getPersonal().lastName,
                                email : this.formDataService.getPersonal().email,
                                accountNum : this.formDataService.getBank().bankAccountNumber,
                                routeNum : this.formDataService.getBank().bankRoutingNumber,
                                dob : {
                                  day: 1,
                                  month: 1,
                                  year: 1992
                                },
                                address: {
                                  city: "centreville",
                                  line1: "leehwy",
                                  zipCode: "14541",
                                  state: "VA"
                                },
                                ssn : this.formDataService.getBank().ssn
                              };
                              this.http.post(this.domain.ip + '/api/payout/register', json, {})
                                .map(res => res.json())
                                .subscribe(
                                  bankRes => {
                                    if(bankRes.success) {
                                      this.formDataService.setType(this.registerType);
                                      this.navCtrl.push(RegisterUserCompletedPage);
                                      loader.dismiss();
                                    }else{
                                      loader.dismiss();
                                    }
                                  }, err => {
                                    loader.dismiss();
                                  });
                            }else{
                              loader.dismiss();
                            }
                          }, (err) => {
                            loader.dismiss();
                          });
                    }, err => {
                      loader.dismiss();
                    })
                }, err => {
                  loader.dismiss();
              })
            }, err => {
              loader.dismiss();
            });
        }, err => {
          loader.dismiss();
        })
    }
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
