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

  public userMenu = [
    {
      title: 'User Info',
      target: 'userInfo',
      icon: 'fa fa-user-circle-o',
      permission: 'all'
    },
    {
      title: 'Payments',
      target: 'payments',
      icon: 'fa fa-credit-card',
      permission: 'rider'
    },
    {
      title: 'History',
      target: 'history',
      icon: 'fa fa-history',
      permission: 'rider'
    },
    {
      title: 'Billing History',
      target: 'billing',
      icon: 'fa fa-money'
    },
    {
      title: 'Promotion',
      target: 'promotion',
      icon: 'fa fa-gift',
      permission: 'rider'
    },
    {
      title: 'Notification',
      target: 'notification',
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
      target: 'customersupport',
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, private googleMaps: GoogleMaps, public modalCtrl: ModalController) {
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
      let estimateMenuHeight = document.getElementById('estimateMenu').clientHeight;
      document.getElementById('currentLocationBtn').style.bottom = (estimateMenuHeight + 20) + 'px';
    }
  openPage(page) {
    let modal = this.modalCtrl.create(page);
    modal.present();
  }
}
