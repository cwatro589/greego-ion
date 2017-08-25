import { Component, OnInit } from '@angular/core';
import {
  IonicPage, NavController, NavParams, MenuController, ModalController, ViewController,
  NavOptions, LoadingController, AlertController
} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  CameraPosition,
  MarkerOptions,
  Marker, GoogleMapOptions
} from '@ionic-native/google-maps';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation, Geoposition} from '@ionic-native/geolocation';

import { UserinfoPage } from '../menu/userinfo/userinfo';

import { RequestcallPage } from './requestcall/requestcall';
import { TripcompletedPage } from './tripcompleted/tripcompleted';
import { TripcompletedDriverPage } from './tripcompleted-driver/tripcompleted-driver';

import * as io from 'socket.io-client';
import * as $ from 'jquery'
import {FormDataService} from "../../form/formData.service";
import {Domain} from "../../form/formData.model";
import {HomePage} from "../home/home";
import {NativeGeocoder, NativeGeocoderReverseResult} from "@ionic-native/native-geocoder";
import {CallNumber} from "@ionic-native/call-number";

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
    Domain,
    NativeGeocoder,
    CallNumber
  ]
})
export class DriverPage implements OnInit {

  step:string = 'home';

  pickuplocation:string;
  destination:string;

  buttonDisabled:boolean = false;
  cancelationLimitTime:number = 1;

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
      icon: 'fa fa-money',
      permission: 'all'
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

  activeStep:any = this.stepSet.waiting;
  currentStep:string = 'waiting';

  userInfo:any;
  selectedCreditCard:any;
  selectedCreditCardIcon:string;
  creditcardtype:string;

  request;
  map: GoogleMap;
  requestUserInfo:any = [];
  socket:any;
  watchPos: any;

  srcAddress:string = '';
  desAddress: string = '';
  srcLoc:any;
  desLoc:any;

  estimatePrice:number;
  creditCardList:any;

  requestModal:any;
  // request모달 창
  list:any;
  // socket 메세지 정보
  tripId:any;
  // 여행 아이디
  isMeetUser:number = 0;
  // 유저-드라이버 근처 여부

  srcMarker:Marker;
  desMarker:Marker;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private googleMaps: GoogleMaps, public modalCtrl: ModalController, private formDataService: FormDataService, public http: Http, public viewCtrl: ViewController, public geolocation: Geolocation, private domain:Domain, public loadingCtrl:LoadingController, private nativeGeocoder: NativeGeocoder, private callNumber: CallNumber, private alertCtrl: AlertController) {
    this.socket = io.connect(this.domain.ip);
    this.formDataService.setSocket(this.socket);
    this.getUserInfo();

    this.socket.on('tripAccept', (data) => {
      console.log(data, 'list');
      this.tripId = data.tripId;
      console.log(this.tripId, 'tripId');

      if(this.userInfo.lastLoginClass === 2) {
        this.requestModal.dismiss();
        this.mapClickable('map');

        if(data.driver.socketId === this.formDataService.getSocketId()){
          this.list = data;
          this.isMeetUser = 1;
          this.nextStep();
        }
      }else if(this.userInfo.lastLoginClass === 1) {
        if(data.user.socketId === this.formDataService.getSocketId()) {
          this.mapClickable('map');
          this.list = data;
          this.nextStep();
        }
      }
    }); // 드라이버용

    this.socket.on('tripReject', (data) => {
      if(this.userInfo.lastLoginClass === 2) {
        this.requestModal.dismiss();
      }else if(this.userInfo.lastLoginClass === 1) {
        console.log(data, "list1")
        if(data.userId === this.formDataService.getPersonal().id) {
          this.stepFlow = this.userStepFlow;
          this.activeStep = this.stepSet.home;
          this.currentStep= 'home';
          this.srcMarker.remove();
          this.desMarker.remove();
        }
      }

      this.mapClickable('map');
    }); // 드라이버용

    this.socket.on('tripCancel', (data) => {
      console.log(data, 'tripCancel');
      this.currentStep = this.stepFlow[0];
      this.activeStep = this.stepSet[Object.keys(this.stepSet)[0]];

      // if(this.userInfo.lastLoginClass === 2){
      //   console.log(data.driver.id, "driverId");
      //   console.log(this.formDataService.getPersonal().id, "personalId");
      //   if(data.driver.Id == this.formDataService.getPersonal().id) {
      //     console.log("id");
      //     this.currentStep = 'waiting';
      //     this.activeStep = this.stepSet.waiting;
      //   }
      // }else if(this.userInfo.lastLoginClass === 1) {
      //   if(data.user.id === this.formDataService.getPersonal().id) {
      //     this.currentStep = this.stepFlow[0];
      //     this.activeStep = this.stepSet[Object.keys(this.stepSet)[0]];
      //     this.srcMarker.remove();
      //     this.desMarker.remove();
      //   }
      // }
    }); // 유저 및 드라이버 겸용

    this.socket.on('tripStart', (msg) => {
      const list = msg;
      console.log(list, "tripStart");
      this.navCtrl.setRoot(TripcompletedPage, {list : list});
    });

    this.socket.on('tripComplete', (msg) => {
      console.log(msg, 'msg');
      // if(msg.)
      this.nextStep();
    }); // 유저용
  }

  mapClickable(command:string) {
    if(command === 'map') {
      this.formDataService.getMap().setClickable(true);
    }else if(command === 'menu') {
      this.formDataService.getMap().setClickable(false);
    }
  }

  driverRequestCall(msg:any) {
    if(this.userInfo.lastLoginClass === 2) {
      this.requestModal = this.modalCtrl.create('RequestcallPage', {
        info : {
          msg
        }
      });

      this.requestModal.present();

      // let time2 = 5000;
      // setTimeout(function(){
      //   this.nextStep();
      //   console.log('1');
      // }.bind(this), time2);
      // // request화면 -> riderLoaction화면
    }
  }

  ngOnInit() {
    // debugger;
  }

  getUserInfo() {
    this.userInfo = this.navParams.data.data.data;
    console.log(this.userInfo, 'userInfo');

    const personal = this.formDataService.getPersonal();
    personal.email = this.userInfo.email;
    personal.phone = this.userInfo.phoneNum;
    personal.firstName = this.userInfo.fName;
    personal.lastName = this.userInfo.lName;
    personal.password = '';
    personal.id = this.userInfo.id;

    if(this.userInfo.user !== null) {
      personal.userGrade = this.userInfo.user.score.grade;
    }

    if(this.userInfo.driver !== null) {
      personal.driverGrade = this.userInfo.driver.score.grade;
    }

    this.formDataService.setPersonal(personal);

    const photo = this.formDataService.getFacePhoto();
    photo.facePhotoLocation = this.userInfo.image;
    this.formDataService.setFacePhoto(photo);

    if (this.userInfo.lastLoginClass == 1) {
      this.stepFlow = this.userStepFlow;
      this.activeStep = this.stepSet.home;
      this.currentStep= 'home';

      const carInfo = this.formDataService.getRider();
      carInfo.carBrand = this.userInfo.user.carInfo.brand;
      carInfo.carColor = this.userInfo.user.carInfo.color;
      carInfo.carModel = this.userInfo.user.carInfo.model;
      carInfo.carYear = this.userInfo.user.carInfo.year;
      carInfo.carTrim = this.userInfo.user.carInfo.trim;
      carInfo.carTransmittion = this.userInfo.user.carInfo.transmission;
      this.formDataService.setRider(carInfo);

      const userFilters = this.userMenu.filter((item) => {
        return item.permission === 'all' || item.permission === 'rider';
      });

      this.userMenu = userFilters;
      this.defineCreditCard();
    }
    else {
      this.stepFlow = this.driverStepFlow;
      let filters = this.userMenu.filter((item) => {
        return item.permission === 'all' || item.permission === 'driver';
      });

      this.userMenu = filters;

      if(this.userInfo.user.createDate == null){
         filters = this.userMenu.filter((item) => {
           return item.title !== 'User Mode';
         });

        this.userMenu = filters;
      }

      this.stepFlow = this.driverStepFlow;
      const bank = this.formDataService.getBank();

      const driver = this.formDataService.getDriver();
      driver.availCarTypeSedan = this.userInfo.driver.available.sizeOfCar.sedan;
      driver.availCarTypeSuv = this.userInfo.driver.available.sizeOfCar.suv;
      driver.availCarTypeVan = this.userInfo.driver.available.sizeOfCar.van;
      driver.availCarTransmissionAuto = this.userInfo.driver.available.transmission.automatic;
      driver.availCarTransmissionManual = this.userInfo.driver.available.transmission.manual;
      this.formDataService.setDriver(driver);

      this.http.post(this.domain.ip + '/api/payout/list', { id : this.userInfo.id}, {})
        .map(res => res.json())
        .subscribe(foundBalance => {
          bank.bankAccountNumber = foundBalance.data.accountNum;
          bank.bankRoutingNumber = foundBalance.data.routeNum;
          this.formDataService.setBank(bank);
          this.userInfo.driver['bank'] = this.formDataService.getBank();
        })
    }

    $.each(this.stepSet, function(i, v) {
      if (this.stepFlow[0] == i) {
        return this.activeStep = v;
      }
    }.bind(this));
  }

  changeCC() {
    let modal = this.modalCtrl.create('PaymentsPage', {changeCC: true, cardList : this.creditCardList});

    modal.dismiss(data => {
      this.creditCardList = data;
      this.changeCreditCard();
    });
    modal.present();
  }

  changeCreditCard() {
    for (let i = 0; i < Object.keys(this.creditCardList).length; i++) {
      if (this.creditCardList[i].default) {
        this.selectedCreditCard = this.creditCardList[i];
        this.selectedCreditCardIcon = this.creditCardIcon(this.creditCardList[i].brand);
        break;
      }
    }
  }

  defineCreditCard() {
    this.http.post(this.domain.ip + '/api/payment/wallet', { id : this.formDataService.getPersonal().id })
      .map(res => res.json())
      .subscribe(foundCard => {
        if(foundCard.message === 'no cards registered'){
          this.creditCardList = [];
        }else{
          this.creditCardList = foundCard.data.list;

          for (let i = 0; i < Object.keys(this.creditCardList).length; i++) {
            if (this.creditCardList[i].default) {
              this.selectedCreditCard = this.creditCardList[i];
              this.selectedCreditCardIcon = this.creditCardIcon(this.creditCardList[i].brand);
            }
          }
        }
      });
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
        // var time = 5000;
        // setTimeout(function(){
        //   this.nextStep();
        // }.bind(this), time);
        break;
      case "ontrip":
        // var time = 5000;
        // setTimeout(function(){
        //   this.navCtrl.setRoot(TripcompletedPage);
        // }.bind(this), time);
        break;
    }
  }

  tripRequest() {
    this.socket.emit('tripRequest', {
      info : {
        user: {
          socketId : this.formDataService.getSocketId(),
          id : this.userInfo.id,
          fName : this.userInfo.fName,
          lName : this.userInfo.lName,
          phoneNum : this.userInfo.phoneNum,
          image : this.userInfo.image,
          grade : this.userInfo.user.score.grade
        },
        source : {
          loc : this.srcLoc,
          addr : this.srcAddress
        },
        destination : {
          loc : this.desLoc,
          addr : this.desAddress
        },
        estimatePrice : this.estimatePrice
      }
    });

    // this.nextStep();
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

    // https://github.com/mapsplugin/cordova-plugin-googlemaps-doc/tree/master/v2.0.0/Installation
    // Ionic Native Google Maps v2.0.0 plugin

    // let loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    //
    // loader.present();

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('map');
    const mapOptions : GoogleMapOptions = {
      mapType : "MAP_TYPE_NORMAL",
      controls : {
        compass: false,
        myLocationButton: false,
        indoorPicker: false,
        mapToolbar: false
      },
      gestures: {
        scroll: true,
        tilt: true,
        zoom: true,
        rotate: true
      },
      preferences: {
        zoom : {
          minZoom : 14,
          maxZoom : 19
        }
      },
      styles:[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#bcffb0"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ade2fc"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    };

    this.map = this.googleMaps.create(element, mapOptions);

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    this.map.one(GoogleMapsEvent.MAP_READY).then(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker

        let lat: number;
        let lng: number;

        this.geolocation.getCurrentPosition()
          .then((resp) => {
            // loader.dismiss();
            lat = resp.coords.latitude;
            lng = resp.coords.longitude;
            // 40.6892494,-74.0445004
            // move the map's camera to position
            this.map.setCameraTarget({lat : lat, lng : lng});
            this.map.setCameraZoom(17);
            this.formDataService.setMap(this.map);

            const json = {
              id : this.userInfo.id,
              userType: 1,
              loc : {
                lat: lat,
                lng: lng
              }
            };

            if(this.userInfo.lastLoginClass == 2) {
              json.userType = 2;
            }

            this.socket.emit('updateLocation', json);

            this.socket.on('updateLocation', (msg) => {
              this.formDataService.setSocketId(msg);
            });

            if(this.userInfo.lastLoginClass === 1) {
              let driverMarker:any = new Array(0);

              setInterval(() => {
                this.socket.emit('nearbydriver', {
                  id : this.userInfo.id,
                  userType: this.userInfo.lastLoginClass,
                  loc : {
                    lat: lat,
                    lng: lng
                  }
                });
              }, 1000);

              this.socket.on('nearbydriverList', (list) => {
                if(driverMarker !== undefined || driverMarker !== '' || driverMarker !== null) {
                  const size = driverMarker.length;

                  if(size > 0) {
                    for(let i=1;i<driverMarker.length;i++){
                      driverMarker[i].remove();
                    }
                  }
                }

                let lat;
                let lng;

                driverMarker = new Array(list.length);
                for(let index=0;index<list.length;index++){
                  lat = list[index].loc.lat;
                  lng = list[index].loc.lng;

                  let markerOptions: MarkerOptions = {
                    position: new LatLng(lat, lng)
                  };

                  this.map.addMarker(markerOptions)
                    .then((marker: Marker) => {
                      driverMarker.push(marker);
                    })
                }
              })

              this.map.on(GoogleMapsEvent.CAMERA_MOVE_END)
                .subscribe((data) => {
                  this.nativeGeocoder.reverseGeocode(data.target.lat, data.target.lng)
                    .then((result:NativeGeocoderReverseResult) => {
                      const zipCode = result.postalCode;
                      const street = result.thoroughfare;
                      const city = result.locality;
                      const district = result.administrativeArea;

                      const countryCode = result.countryCode;
                      const countryName = result.countryName;
                      const houseNumber = result.subThoroughfare;

                      let address = houseNumber + " " + street + " " + city + " " + district + " " + zipCode;

                      if(houseNumber !== undefined) {
                        address = houseNumber + " ";
                      }

                      address += street + " " + city + " " + district + " " + zipCode;

                      let markerOptions: MarkerOptions = {
                        position: new LatLng(data.target.lat, data.target.lng),
                        title: 'current location'
                      };

                      if(this.currentStep === 'home') {
                        this.srcAddress = address;

                        if(this.srcMarker !== undefined){
                          this.srcMarker.remove();
                        }

                        this.map.addMarker(markerOptions)
                          .then((marker: Marker) => {
                            this.srcMarker = marker;
                            this.srcMarker.showInfoWindow();
                            this.srcMarker.one(GoogleMapsEvent.INFO_CLICK).then(() => {
                              this.srcLoc = [this.srcMarker.getPosition().lat, this.srcMarker.getPosition().lng];
                              this.nextStep();
                            })
                          })
                      }else if(this.currentStep === 'destination'){
                        this.desAddress = address;

                        if(this.desMarker !== undefined){
                          this.desMarker.remove();
                        }

                        this.map.addMarker(markerOptions)
                          .then((marker: Marker) => {
                            this.desMarker = marker;
                            this.desMarker.showInfoWindow();
                            this.desMarker.one(GoogleMapsEvent.INFO_CLICK).then(() => {
                              this.mapClickable("menu");
                              const origin = this.srcMarker.getPosition().lat + "," + this.srcMarker.getPosition().lng;
                              const destination = this.desMarker.getPosition().lat + "," + this.desMarker.getPosition().lng

                              this.desLoc = [this.srcMarker.getPosition().lat, this.srcMarker.getPosition().lng];

                              this.http.get(this.domain.ip + '/api/trip/estimate?origin=' + origin + "&destination=" + destination)
                                .map(res => res.json())
                                .subscribe(estimate => {
                                  this.estimatePrice = estimate.price;
                                  this.nextStep();
                                });
                            })
                          })
                      }
                    }).catch((error:any) => {
                    console.log(error);
                  })
                });
            }else {
              let markers:Marker;

              let markerOptions: MarkerOptions = {
                position : new LatLng(lat, lng),
                title : 'current location'
              };

              this.socket.on('tripRequest', (msg) => {
                  console.log(msg, 'tripRequest');
                  this.driverRequestCall(msg);
              });

              this.map.addMarker(markerOptions)
                .then((marker: Marker) => {
                  markers = marker;
                  markers.showInfoWindow();
                });

              this.watchPos = this.geolocation.watchPosition()
                .subscribe(pos => {
                  if(pos.coords !== undefined){
                    markers.remove();

                    let markerOptions: MarkerOptions = {
                      position : new LatLng(pos.coords.latitude, pos.coords.longitude),
                      title : 'current location'
                    };

                    this.map.addMarker(markerOptions)
                      .then((marker: Marker) => {
                        markers = marker;
                        markers.showInfoWindow();
                      })

                    this.socket.emit('updateLocation', {
                      id : this.userInfo.id,
                      userType: this.userInfo.lastLoginClass,
                      loc : {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude
                      }
                    });

                    if(this.isMeetUser === 1) {
                      const distance = this.calcDistance(pos.coords.latitude, pos.coords.longitude, this.list.user.srcLoc[0], this.list.user.srcLoc[1]);
                      // product - 0.015
                      // dev - 1
                      // this.nextStep();
                      if(distance < 0.02){
                        this.nextStep();
                        this.isMeetUser = 2;
                      }
                    }else if(this.isMeetUser === 2){
                      // const distance = this.calcDistance(this.list.user.srcLoc[0], this.list.user.srcLoc[1], this.list.user.desLoc[0], this.list.user.desLoc[1]);
                      const distance = this.calcDistance(pos.coords.latitude, pos.coords.longitude, this.list.user.desLoc[0], this.list.user.desLoc[1]);
                      // product - 0.015
                      // dev - 1
                      // this.nextStep();
                      if(distance < 0.02){
                        this.nextStep();
                        this.isMeetUser = 0;
                      }
                    }
                  }
                })
            }
          })
      });

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

  calcDistance(lat1, lon1, lat2, lon2){
    const EARTH_R = 6371000.0;
    let Rad, radLat1, radLat2, radDist;
    let distance, ret;

    Rad 		= Math.PI/180;
    radLat1 = Rad * lat1;
    radLat2 = Rad * lat2;
    radDist = Rad * (lon1 - lon2);

    distance = Math.sin(radLat1) * Math.sin(radLat2);
    distance = distance + Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radDist);
    ret 		 = EARTH_R * Math.acos(distance);

    distance = Math.round(Math.round(ret) / 1000);

    if(distance <= 0){
      distance = Math.round(ret)+'';
    }else{
      distance = distance*1000;
    }
    return distance * 0.000621;
  } // 위경도 거리환산

  getCurrentPosition() {
    let lat: number;
    let lng: number;

    this.geolocation.getCurrentPosition().then((resp) => {
      lat = resp.coords.latitude;
      lng = resp.coords.longitude;
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
    if(page === 'PaymentsPage'){
      let modal = this.modalCtrl.create(page, {
        cardList : this.creditCardList
      });
      modal.dismiss(data => {
        this.creditCardList = data;
      });
      modal.present();
    }else if(page !== 'signout'){
      let modal = this.modalCtrl.create(page, {
        lastLoginClass : this.userInfo.lastLoginClass
      });
      modal.present();
    }else{
      this.http.post(this.domain.ip + '/api/auth/logout', {
        id : this.formDataService.getPersonal().id
      }).map(res => res.json())
        .subscribe(logoutRes => {
          if(logoutRes.success){
            this.navCtrl.setRoot(HomePage);
          }
        });
    }
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
      console.log(this.currentStep, 'currentStep');
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
    console.log(this.tripId, "id");

    if(this.buttonDisabled){
      let alert = this.alertCtrl.create({
        title: 'Cancellation fee payment',
        message: 'The cancellation fee is $ 25. Do you really want to cancel?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: () => {
              this.currentStep = this.stepFlow[0];
              this.activeStep = this.stepSet[Object.keys(this.stepSet)[0]];
              this.srcMarker.remove();
              this.desMarker.remove();

              this.socket.emit('tripCancel', {
                tripId : this.tripId,
                isOverTime : true
              });
            }
          }
        ]
      });
      alert.present();
    }else{
      console.log(this.formDataService.getPersonal(), "id");

      this.currentStep = this.stepFlow[0];
      this.activeStep = this.stepSet[Object.keys(this.stepSet)[0]];
      this.srcMarker.remove();
      this.desMarker.remove();

      this.socket.emit('tripCancel', {
        tripId : this.tripId,
        isOverTime : true
      });
    }
  }

  callToRider(call:any) {
    // alert('Call to Rider Function!');

    let alert = this.alertCtrl.create({
      title: 'Call Rider',
      message: 'Do you really want to call?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.callNumber.callNumber("18001010101", true)
              .then(() => console.log('Launched dialer!'))
              .catch(() => console.log('Error launching dialer'));
          }
        }
      ]
    });
    alert.present();
  }

  openNavigation() {
    alert('Nav App!');
  }

  startTrip() {
    this.nextStep();

    this.socket.emit('tripStart', {
      tripId : this.list.tripId,
      user : {
        socketId : this.list.user.socketId
      },
      driver : {
        socketId : this.list.driver.socketId
      }
    });
  }

  completedTrip() {
    this.navCtrl.setRoot(TripcompletedDriverPage, {list : this.list});
    // console.log(this.list, "complete list");

    this.socket.emit('tripComplete', {
      tripId : this.tripId,
      user : {
        socketId : this.list.user.socketId
      }
    })
  } // 드라이버용

  //1초 후 다음 스탭으로 넘기는 테스트용 기능.
  // dummyStep() {
  //   let time = 2000;
  //   setTimeout(function(){
  //     this.nextStep();
  //   }.bind(this), time);
  // }

}
