import { Component, OnInit } from '@angular/core';
import {
  IonicPage, NavController, NavParams, MenuController, ModalController, ViewController,
  LoadingController
} from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 LatLng,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

import { UserinfoPage } from '../menu/userinfo/userinfo';

import { RequestcallPage } from './requestcall/requestcall';
import { TripcompletedPage } from './tripcompleted/tripcompleted';
import { TripcompletedDriverPage } from './tripcompleted-driver/tripcompleted-driver';

import * as $ from 'jquery'
import {FormDataService} from "../../form/formData.service";
import {Domain} from "../../form/formData.model";

/**
 * Generated class for the DriverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driver',
  templateUrl: 'driver.html',
  providers: [
    Domain
  ]
})
export class DriverPage implements OnInit {

  step:string = 'home';

  pickuplocation:string;
  destination:string;

  buttonDisabled:boolean = false;
  cancelationLimitTime:number = 2;

  userStepFlow = [
    'home', 'destination', 'estimates', 'enroute', 'ontrip'
  ]

  driverStepFlow = [
    'waiting', 'driverEnroute', 'arrivedAtRider', 'onGoing', 'destinationArrived'
  ]

  stepFlow:any;

  stepSet = {
    home: {
      headerTitle: 'Greego',
      headerIcon: '',
      cardTitle: '',
      pickupLocation: true,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      riderInfo: false,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    destination: {
      headerTitle: 'Greego',
      headerIcon: '',
      cardTitle: '',
      pickupLocation: true,
      destination: true,
      estimateMenu: false,
      driverInfo: false,
      riderInfo: false,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    estimates : {
      headerTitle: 'Request Greego Driver',
      headerIcon: '',
      cardTitle: '',
      pickupLocation: true,
      destination: true,
      estimateMenu: true,
      driverInfo: false,
      riderInfo: false,
      pickupInfo: false,
      destinationAddress: false,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    enroute : {
      headerTitle: 'En Route',
      headerIcon: 'fa fa-map-marker',
      cardTitle: 'Driver Confirmed and En Route',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: true,
      riderInfo: false,
      pickupInfo: false,
      destinationAddress: false,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    ontrip : {
      headerTitle: 'On Trip',
      headerIcon: 'fa fa-map-marker',
      cardTitle: 'Your on Trip',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      riderInfo: false,
      pickupInfo: false,
      destinationAddress: true,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    waiting : {
      headerTitle: 'Greego Driver',
      headerIcon: '',
      cardTitle: 'No New Ride Request',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      driverWaiting: true,
      driverEnroute: false,
      riderInfo: false,
      pickupInfo: false,
      destinationAddress: false,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    driverEnroute : {
      headerTitle: 'En Route',
      headerIcon: 'fa fa-map-marker',
      cardTitle: '',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      estimateTime: true,
      riderInfo: true,
      pickupInfo: true,
      destinationAddress: false,
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    },
    arrivedAtRider : {
      headerTitle: 'Rider Location Arrived',
      headerIcon: 'fa fa-map-marker',
      cardTitle: '',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      estimateTime: false,
      riderInfo: true,
      pickupInfo: true,
      destinationAddress: false,
      arrivedatrider: true,
      destinationArrived: false,
      customerRate: false
    },
    onGoing : {
      headerTitle: 'Ongoing',
      headerIcon: 'fa fa-map-marker',
      cardTitle: '',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      estimateTime: false,
      riderInfo: true,
      pickupInfo: false,
      destinationAddress: true,
      arrivedatrider: false,
      ongoing: true,
      destinationArrived: false,
      customerRate: false
    },
    destinationArrived : {
      headerTitle: 'Destination Arrived',
      headerIcon: 'fa fa-map-marker',
      cardTitle: 'Arrived near the destination.',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      estimateTime: false,
      riderInfo: true,
      pickupInfo: false,
      destinationAddress: true,
      arrivedatrider: false,
      ongoing: true,
      destinationArrived: true,
      customerRate: false
    },
    tripCompleted : {
      headerTitle: 'Trip Completed',
      headerIcon: 'fa fa-map-marker',
      cardTitle: '',
      pickupLocation: false,
      destination: false,
      estimateMenu: false,
      driverInfo: false,
      estimateTime: false,
      riderInfo: true,
      pickupInfo: false,
      destinationAddress: true,
      arrivedatrider: false,
      ongoing: false,
      destinationArrived: true,
      customerRate: true
    }
  }

  userMenu = [
    {
      title: 'User Info',
      target: 'UserinfoPage',
      icon: 'fa fa-user-circle-o',
      permission: 'all'
    },
    {
      title: 'Payments',
      target: 'PaymentsPage',
      icon: 'fa fa-credit-card',
      permission: 'rider'
    },
    {
      title: 'History',
      target: 'HistoryPage',
      icon: 'fa fa-history',
      permission: 'rider'
    },
    {
      title: 'Billing History',
      target: 'BillingPage',
      icon: 'fa fa-money'
    },
    {
      title: 'Promotion',
      target: 'PromotionPage',
      icon: 'fa fa-gift',
      permission: 'rider'
    },
    {
      title: 'Notification',
      target: 'NotificationPage',
      icon: 'fa fa-envelope-open-o',
      permission: 'rider'
    },
    {
      title: 'User Mode',
      target: 'usermode',
      icon: 'fa fa-exchange',
      permission: 'driver'
    },
    {
      title: 'Customer Support',
      target: 'CustomersupportPage',
      icon: 'fa fa-support',
      permission: 'all'
    },
    {
      title: 'Sign out',
      target: 'signout',
      icon: 'fa fa-sign-out',
      permission: 'all'
    }
  ];

  activeStep:any = this.stepSet.home;
  currentStep:string = 'home';

  userInfo:any;
  selectedCreditCard:any;
  selectedCreditCardIcon:string;
  creditcardtype:string;

  request;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private googleMaps: GoogleMaps, public modalCtrl: ModalController, public http: Http, public viewCtrl: ViewController, private geolocation: Geolocation, public loadingCtrl:LoadingController, private formDataService: FormDataService, private domain: Domain) {
    this.getUserInfo();

      let time = 1000;
      // setTimeout(function(){
      //   this.driverRequestCall();
      // }.bind(this), time);

  }

  driverRequestCall() {
    let modal = this.modalCtrl.create('RequestcallPage');
    modal.onDidDismiss(data => {
      if (data == true) {
        this.nextStep();
      }
      else {
        this.driverRequestCall();
      }
    });
    modal.present();

    let time2 = 3000;
    setTimeout(function(){
        this.nextStep();
        console.log('1');
    }.bind(this), time2);
  }

  ngOnInit() {
    // debugger;
  }

  getUserInfo() {
    const json = {
      email : this.formDataService.getPersonal().email
    };
    this.http.post(this.domain.ip + "/api/users/test", {email : 'hbc8141@naver.com'}, {})
    .map(res => res.json())
    .subscribe(loginRes => {
      if(loginRes.success) {
        this.userInfo = loginRes;
        if(loginRes.lastLoginClass == 1) {
          delete loginRes['driver'];
        }else if(loginRes.lastLoginClass == 2){
          delete loginRes['user'];
        }
        console.log(loginRes);
        // this.navCtrl.setRoot(DriverPage);
      }
    });

    this.http.get('http://localhost:8100/assets/usersample.json').map(res => res.json()).subscribe((data) => {
      // if(data.lastLoginClass == 1){
      //   const json = {
      //     userType : 'rider',
      //     driverid : data.id,
      //     creditCard : '',
      //     facePhoto : data.image,
      //     firstName : data.fName,
      //     lastName : data.lName,
      //     phone: data.phoneNum,
      //     email : data.email,
      //     carYear : data.user.carInfo.year,
      //     carBrand : data.user.carInfo.brand,
      //     carModel : data.user.carInfo.model,
      //     carTrim : data.user.carInfo.trim,
      //     carTransmission : data.user.carInfo.transmission
      //   };
      //   this.userInfo = json;
      // }else if(data.lastLoginClass == 2){
      //   const json = {
      //     userType : 'driver',
      //     driverid : data.id,
      //     creditCard : '',
      //     facePhoto : data.image,
      //     firstName : data.fName,
      //     lastName : data.lName,
      //     phone: data.phoneNum,
      //     email : data.email,
      //     carYear : data.user.carInfo.year,
      //     carBrand : data.user.carInfo.brand,
      //     carModel : data.user.carInfo.model,
      //     carTrim : data.user.carInfo.trim,
      //     carTransmission : data.user.carInfo.transmission,
      //     availCarType : data.driver.available.sizeOfCar,
      //     availTransmission : data.driver.available.transmission
      //   };
      // }
      this.userInfo = data;
      this.defineCreditCard();

      if (this.userInfo.userType == 'rider') {
        this.stepFlow = this.userStepFlow;
      }
      else {
        this.stepFlow = this.driverStepFlow;
      }

      $.each(this.stepSet, function(i, v) {
        if (this.stepFlow[0] == i) {
          return this.activeStep = v;
        }
      }.bind(this));

    },
    err => {
        console.log("Oops!");
    });
  }

  changeCC() {
    let modal = this.modalCtrl.create('PaymentsPage', {changeCC: true});
    modal.present();
  }

  changeCreditCard(id) {
    for (let i = 0; i < Object.keys(this.userInfo.creditCard).length; i++) {
      if (this.userInfo.creditCard[i].id == id) {
        this.selectedCreditCard = this.userInfo.creditCard[i];
        this.selectedCreditCardIcon = this.creditCardIcon(this.userInfo.creditCard[i].type);
      }
    }
  }

  defineCreditCard() {
    for (let i = 0; i < Object.keys(this.userInfo.creditCard).length; i++) {
      if (this.userInfo.creditCard[i].default) {
        this.selectedCreditCard = this.userInfo.creditCard[i];
        this.selectedCreditCardIcon = this.creditCardIcon(this.userInfo.creditCard[i].type);
      }
    }
  }

  creditCardIcon(type) {
    switch(type) {
      case "visa":
        return 'fa fa-cc-visa';
      case "mastercard":
        return 'fa fa-cc-mastercard';
      case "discover":
        return 'fa fa-cc-discover';
      case "amex":
        return 'fa fa-cc-amex';
    }
  }

  creditCardName(type) {
    switch(type) {
      case "visa":
        return 'visa';
      case "mastercard":
        return 'master';
      case "discover":
        return 'discover';
      case "amex":
        return 'american express';
    }
  }

  callFunction(name) {
    switch(name) {
      case "enroute":
        this.disableCancelBtn();
        var time = 5000;
        setTimeout(function(){
          this.nextStep();
        }.bind(this), time);
        break;
      case "ontrip":
        var time = 5000;
        setTimeout(function(){
          this.navCtrl.setRoot(TripcompletedPage);
        }.bind(this), time);
        break;
    }
  }

  disableCancelBtn() {
    var minutes = this.cancelationLimitTime;
    var seconds = minutes * ( 60 * 1000 );
    setTimeout(function(){
      this.buttonDisabled= true;
    }.bind(this), seconds);
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverPage');
  }

  loadMap() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    this.map = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    let lat: number;
    let lng: number;
    this.geolocation.getCurrentPosition().then((resp) => {
        loader.dismiss();
        lat = resp.coords.latitude;
        lng = resp.coords.longitude;
        console.log(resp);
        let position: CameraPosition = {
          target: {
            lat: lat,
            lng: lng
          },
          zoom: 18,
          tilt: 30
        };

        // move the map's camera to position
        this.map.moveCamera(position);
      }).catch((err) => {
      console.log(err);
    });

    // create CameraPosition


    // create new marker
    //  let markerOptions: MarkerOptions = {
    //    position: ionic,
    //    title: 'Ionic'
    //  };

    //  const marker: Marker = map.addMarker(markerOptions)
    //    .then((marker: Marker) => {
    //       marker.showInfoWindow();
    //     });

    let estimateMenuHeight = $('#estimateMenu').outerHeight();
    $('#currentLocationBtn').css({'bottom': estimateMenuHeight + 20});

    // let estimateMenuHeight = document.getElementById('estimateMenu').clientHeight;
    // document.getElementById('currentLocationBtn').style.bottom = (estimateMenuHeight + 20) + 'px';


    //Driver Rating - 5 Star
    $('.driverRating i').click(function() {
      $('.driverRating i').removeClass('active');
      $(this).prevAll('i').addBack().addClass('active');
    });
  }

  getCurrentPosition() {
    let lat: number;
    let lng: number;
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      loader.dismiss();
      lat = resp.coords.latitude;
      lng = resp.coords.longitude;
      console.log(resp);
      let position: CameraPosition = {
        target: {
          lat: lat,
          lng: lng
        },
        zoom: 18,
        tilt: 30
      };

      // move the map's camera to position
      this.map.moveCamera(position);
    }).catch((err) => {
      console.log(err);
    });
  }

  checkPickupLocation() {
    if (this.pickuplocation == undefined || this.pickuplocation == '') {
      if (this.destination == undefined || this.destination == '') {
        return false;
      }
      return false;
    }
    else {
      this.step = 'destinationSearch';
    }
  }

  // Open Pages in Menu
  openPage(page) {
    let modal = this.modalCtrl.create(page);
    modal.present();
  }

  // Open Driver Request Call
  requestCall() {
    let modal = this.modalCtrl.create(RequestcallPage);
    modal.present();
  }

  // Open Completed Page after trip
  tripCompleted() {
    let userType = TripcompletedDriverPage;
    let modal = this.modalCtrl.create(userType);
    modal.present();
  }

  nextStep() {
    for (let i=0; i < this.stepFlow.length; i++) {
      if (this.currentStep == this.stepFlow[i]) {
        let nextstep = ++i;
        for (let stepIndex = 0; stepIndex < Object.keys(this.stepSet).length; stepIndex++) {
          if (this.stepFlow[nextstep] == Object.keys(this.stepSet)[stepIndex]) {
            this.activeStep = this.stepSet[Object.keys(this.stepSet)[stepIndex]];
            this.currentStep = this.stepFlow[nextstep];
            this.callFunction(this.currentStep);
          }
        }
      }
    }
    // debugger;
    // $(this.stepFlow).each(function(flowIndex,flowName) {
    //   debugger;
    //   if (flowName == this.currentStep) {
    //     let nextstep = flowIndex++;
    //     $.each(this.stepSet, function(stepName, stepData) {
    //       if (this.stepFlow[nextstep] == stepName) {
    //         this.currentStep = stepName;
    //         this.activeStep = stepData;
    //       }
    //       else {
    //         console.log('No more next step');
    //       }
    //     })
    //   }
    //   else {
    //     console.log('Error');
    //   }
    // }, this.currentStep)
  }

  resetStep() {
    this.currentStep = this.stepFlow[0];
    this.activeStep = this.stepSet[Object.keys(this.stepSet)[0]];
  }

  callToRider() {
    alert('Call to Rider Function!');
  }

  openNavigation() {
    alert('Nav App!');
  }

  startTrip() {
    this.nextStep();
    this.dummyStep();
  }

  completedTrip() {
    this.navCtrl.setRoot(TripcompletedDriverPage);
  }

  //1초 후 다음 스탭으로 넘기는 테스트용 기능.
  dummyStep() {
    let time = 2000;
    setTimeout(function(){
      this.nextStep();
    }.bind(this), time);
  }

}
