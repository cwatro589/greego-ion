import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ModalController } from 'ionic-angular';
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

import { UserinfoPage } from '../menu/userinfo/userinfo';

import { RequestcallPage } from './requestcall/requestcall';
import { TripcompletedPage } from './tripcompleted/tripcompleted';
import { TripcompletedDriverPage } from './tripcompleted-driver/tripcompleted-driver';

import * as $ from 'jquery'

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
})
export class DriverPage {

  step:string = 'home';

  pickuplocation:string;
  destination:string;

  buttonDisabled:boolean = false;
  cancelationLimitTime:number = 2;

  userStepFlow = [
    'home', 'destination', 'estimates', 'enroute', 'ontrip'
  ]

  driverStepFlow = [
    'waiting', 'request'
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
      arrivedatrider: false,
      destinationArrived: false,
      customerRate: false
    }
  }

  activeStep:any = this.stepSet.home;

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

  userInfo:any;
  selectedCreditCard:any;
  selectedCreditCardIcon:string;
  creditcardtype:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private googleMaps: GoogleMaps, public modalCtrl: ModalController, public http: Http) {
    this.getUserInfo();
  }

  getUserInfo() {
    this.http.get('http://localhost:8100/assets/usersample.json').map(res => res.json()).subscribe(data => {
      this.userInfo = data;
      this.defineCreditCard();

      if (this.userInfo.userType == 'rider') {
        this.stepFlow = this.userStepFlow;
      }
      else {
        this.stepFlow = this.driverStepFlow;
      }
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

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');

    let map: GoogleMap = this.googleMaps.create(element);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );

    // create CameraPosition
    let position: CameraPosition = {
      target: {
        lat: 43.0741904,
        lng: -89.3809802
      },
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

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

  currentStep:string = 'home'; 

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
}